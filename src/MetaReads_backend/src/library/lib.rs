use candid::Principal;

use crate::{book::lib::get_book_by_id, user::lib::get_user_by_id};

use super::model::{Library, LibraryPayload, LibraryResponse};
use crate::{error::error::Error, helper::helper::generate_unique_id, LIBRARY_STORE};

#[ic_cdk::update]
async fn create_library(payload: LibraryPayload) -> Result<LibraryResponse, Error> {
    let book_id = payload.book_id;
    let user_id = payload.user_id;

    let book = match get_book_by_id(&book_id) {
        Some(ref existing_book) => existing_book.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Book not found".to_string(),
            })
        }
    };

    let user = match get_user_by_id(&user_id) {
        Some(ref existing_user) => existing_user.clone(),
        None => {
            return Err(Error::NotFound {
                message: "User not found".to_string(),
            })
        }
    };
    let id = generate_unique_id().await;
    let library = Library { id, book, user };
    insert_library(&library);
    let message = format!(
        "{} has been successfully added to library",
        library.book.title
    );
    let response = LibraryResponse { library, message };
    Ok(response)
}

#[ic_cdk::update]
fn delete_library(id: Principal) -> Result<Library, Error> {
    match get_library(&id) {
        Some(library) => {
            LIBRARY_STORE.with(|library_store| library_store.borrow_mut().remove(&id));
            Ok(library)
        }
        None => Err(Error::NotFound {
            message: format!("Library with ID {} not found. Cannot delete.", id),
        }),
    }
}

#[ic_cdk::query]
fn get_library_by_user(user_id: Principal) -> Vec<Library> {
    let mut libraries = Vec::new();
    LIBRARY_STORE.with(|library_store| {
        let store = library_store.borrow();
        for (_key, library) in store.iter() {
            if library.user.id == user_id {
                libraries.push(library.clone());
            }
        }
    });
    return libraries;
}

pub fn insert_library(library: &Library) {
    LIBRARY_STORE.with(|library_store| {
        library_store
            .borrow_mut()
            .insert(library.id, library.clone());
    });
}

fn get_library(id: &Principal) -> Option<Library> {
    LIBRARY_STORE.with(|library_store| library_store.borrow().get(id))
}
