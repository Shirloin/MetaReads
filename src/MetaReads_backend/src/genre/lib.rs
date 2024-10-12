use validator::Validate;

use super::model::{Genre, GenrePayload, GenreResponse};
use crate::{error::error::Error, helper::helper::generate_unique_id, GENRE_STORE};

#[ic_cdk::update]
async fn create_genre(payload: GenrePayload) -> Result<GenreResponse, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            errors: check_payload.err().unwrap().to_string(),
        });
    }

    let check_stored_name = GENRE_STORE.with(|genre_store| {
        let store = genre_store.borrow();
        for (_key, genre) in store.iter() {
            if genre.name == payload.name {
                return true;
            }
        }
        false 
    });
    if check_stored_name {
        return Err(Error::ValidationErrors {
            errors: "Genre already stored!".to_string(),
        });
    }

    let id = generate_unique_id().await;
    let genre = Genre {
        id,
        name: payload.name,
    };

    GENRE_STORE.with(|genre_store| {
        genre_store.borrow_mut().insert(id, genre.clone());
    });
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
