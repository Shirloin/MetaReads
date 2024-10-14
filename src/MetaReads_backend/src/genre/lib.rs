use candid::Principal;
use validator::Validate;

use super::model::{Genre, GenrePayload, GenreResponse};
use crate::{error::error::Error, helper::helper::generate_unique_id, BOOK_STORE, GENRE_STORE};

#[ic_cdk::update]
async fn create_genre(payload: GenrePayload) -> Result<GenreResponse, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            errors: check_payload.err().unwrap().to_string(),
        });
    }

    if let Some(_) = get_genre_by_name(&payload.name) {
        return Err(Error::ValidationErrors {
            errors: "Genre already exists!".to_string(),
        });
    }

    let id = generate_unique_id().await;
    let genre = Genre {
        id,
        name: payload.name,
        books: Vec::new(),
    };

    insert_genre(&genre);

    let message = format!("{} has been successfully registered", genre.name);
    let response = GenreResponse { genre, message };
    Ok(response)
}

#[ic_cdk::query]
fn get_all_genre() -> Vec<Genre> {
    let mut genres = Vec::new();
    GENRE_STORE.with(|genre_store| {
        let store = genre_store.borrow();

        for (_key, genre) in store.iter() {
            genres.push(genre.clone());
        }
    });
    return genres;
}

#[ic_cdk::update]
fn update_genre(payload: GenrePayload) -> Result<Genre, Error> {
    let id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::NotFound {
                message: "Genre ID is missing".to_string(),
            });
        }
    };

    match get_genre_by_id(&id) {
        Some(mut genre) => {
            let check_payload = payload.validate();
            if check_payload.is_err() {
                return Err(Error::ValidationErrors {
                    errors: check_payload.err().unwrap().to_string(),
                });
            }
            genre.name = payload.name;
            update_books_with_genre(&genre);
            insert_genre(&genre);
            Ok(genre)
        }
        None => Err(Error::NotFound {
            message: format!("Genre with ID {} not found. Cannot update.", id),
        }),
    }
}

#[ic_cdk::update]
fn delete_genre(id: Principal) -> Result<Genre, Error> {
    match get_genre_by_id(&id) {
        Some(genre) => {
            GENRE_STORE.with(|genre_store| genre_store.borrow_mut().remove(&id));
            Ok(genre)
        }
        None => Err(Error::NotFound {
            message: format!("Genre with ID {} not found. Cannot delete.", id),
        }),
    }
}

pub fn insert_genre(genre: &Genre) {
    GENRE_STORE.with(|genre_store| {
        genre_store.borrow_mut().insert(genre.id, genre.clone());
    });
}

pub fn get_genre_by_id(id: &Principal) -> Option<Genre> {
    GENRE_STORE.with(|genre_store| genre_store.borrow().get(id))
}

pub fn get_genre_by_name(name: &String) -> Option<Genre> {
    GENRE_STORE.with(|genre_store| {
        let store = genre_store.borrow();
        for (_key, genre) in store.iter() {
            if &genre.name == name {
                return Some(genre.clone());
            }
        }
        None
    })
}

fn update_books_with_genre(updated_genre: &Genre) {
    BOOK_STORE.with(|book_store| {
        let book_store = book_store.borrow_mut();

        for (_, mut book) in book_store.iter() {
            if book.genre.id == updated_genre.id {
                book.genre = updated_genre.clone();
            }
        }
    });
}
