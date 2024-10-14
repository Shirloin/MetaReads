use crate::{error::error::Error, helper::helper::generate_unique_id, BOOK_STORE};
use candid::Principal;
use ic_cdk::api::time;
use validator::Validate;

use super::model::{Book, BookPayload, BookResponse};

#[ic_cdk::update]
async fn create_book(payload: BookPayload) -> Result<BookResponse, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            errors: check_payload.err().unwrap().to_string(),
        });
    }
    let id = generate_unique_id().await;
    let book = Book {
        id,
        title: payload.title,
        description: payload.description,
        cover_image: payload.cover_image,
        author_id: payload.author_id,
        genre_id: payload.genre_id,
        page_count: payload.page_count,
        plan: payload.plan,
        views: 0,
        created_at: time(),
        updated_at: None,
    };
    BOOK_STORE.with(|book_store| {
        book_store.borrow_mut().insert(id, book.clone());
    });
    let message = format!("{} has been successfully created", book.title);
    let response = BookResponse { book, message };
    Ok(response)
}

#[ic_cdk::query]
fn get_all_book() -> Vec<Book> {
    return BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        let mut books = Vec::new();

        for (_key, book) in store.iter() {
            books.push(book.clone());
        }
        books
    });
}

#[ic_cdk::query]
fn get_book(id: Principal) -> Result<Book, Error> {
    match get_book_by_id(&id) {
        Some(mut book) => {
            book.views = book.views + 1;
            insert_book(&book);
            Ok(book)
        }
        None => {
            return Err(Error::NotFound {
                message: "Book Not Found".to_string(),
            });
        }
    }
}

#[ic_cdk::update]
fn update_book(payload: BookPayload) -> Result<Book, Error> {
    let id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::NotFound {
                message: "Book ID is missing".to_string(),
            });
        }
    };
    match get_book_by_id(&id) {
        Some(mut book) => {
            let check_payload = payload.validate();
            if check_payload.is_err() {
                return Err(Error::ValidationErrors {
                    errors: check_payload.err().unwrap().to_string(),
                });
            }
            book.title = payload.title;
            book.description = payload.description;
            book.cover_image = payload.cover_image;
            book.author_id = payload.author_id;
            book.genre_id = payload.genre_id;
            book.page_count = payload.page_count;
            book.plan = payload.plan;
            book.updated_at = Some(time());
            insert_book(&book);
            Ok(book)
        }
        None => Err(Error::NotFound {
            message: format!("Book with ID {} not found. Cannot update.", id),
        }),
    }
}

#[ic_cdk::update]
fn delete_book(id: Principal) -> Result<Book, Error> {
    match get_book_by_id(&id) {
        Some(book) => {
            BOOK_STORE.with(|book_store| book_store.borrow_mut().remove(&id));
            Ok(book)
        }
        None => Err(Error::NotFound {
            message: format!("Book with ID {} not found. Cannot delete.", id),
        }),
    }
}

#[ic_cdk::query]
fn get_popular_book() -> Vec<Book> {
    let mut books: Vec<Book> = Vec::new();
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        for (_key, book) in store.iter() {
            books.push(book.clone());
        }
    });
    books.sort_by(|a, b| b.views.cmp(&a.views));
    books.into_iter().take(10).collect()
}
#[ic_cdk::query]
fn get_latest_release_book() -> Vec<Book> {
    let mut books: Vec<Book> = Vec::new();
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        for (_key, book) in store.iter() {
            books.push(book.clone());
        }
    });
    books.sort_by(|a, b| b.created_at.cmp(&a.created_at));
    books.into_iter().take(20).collect()
}

fn get_book_by_id(id: &Principal) -> Option<Book> {
    BOOK_STORE.with(|book_store| book_store.borrow().get(id))
}

fn insert_book(book: &Book) {
    BOOK_STORE.with(|book_store| {
        book_store.borrow_mut().insert(book.id, book.clone());
    });
}
