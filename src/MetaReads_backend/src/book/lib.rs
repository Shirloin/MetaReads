use crate::{error::error::Error, helper::helper::generate_unique_id, BOOK_STORE};
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
