use candid::Principal;
use validator::Validate;

use super::model::{Author, AuthorPayload, AuthorResponse};
use crate::{error::error::Error, helper::helper::generate_unique_id, AUTHOR_STORE};

#[ic_cdk::update]
async fn create_author(payload: AuthorPayload) -> Result<AuthorResponse, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            errors: check_payload.err().unwrap().to_string(),
        });
    }

    if let Some(_) = get_author_by_name(&payload.name) {
        return Err(Error::ValidationErrors {
            errors: "Author already exists!".to_string(),
        });
    }

    let id = generate_unique_id().await;
    let author = Author {
        id,
        name: payload.name,
    };
    insert_author(&author);
    let message = format!("{} has been successfully registered", author.name);
    let response = AuthorResponse { author, message };
    Ok(response)
}

#[ic_cdk::query]
fn get_all_author() -> Vec<Author> {
    return AUTHOR_STORE.with(|author_store| {
        let store = author_store.borrow();
        let mut authors = Vec::new();

        for (_key, author) in store.iter() {
            authors.push(author.clone());
        }
        authors
    });
}

#[ic_cdk::update]
fn update_author(payload: AuthorPayload) -> Result<Author, Error> {
    let id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::NotFound {
                message: "Author ID is missing".to_string(),
            });
        }
    };

    match get_author(&id) {
        Some(mut author) => {
            let check_payload = payload.validate();
            if check_payload.is_err() {
                return Err(Error::ValidationErrors {
                    errors: check_payload.err().unwrap().to_string(),
                });
            }
            author.name = payload.name;
            insert_author(&author);
            Ok(author)
        }
        None => Err(Error::NotFound {
            message: format!("Author with ID {} not found. Cannot update.", id),
        }),
    }
}

#[ic_cdk::update]
fn delete_author(id: Principal) -> Result<Author, Error> {
    match get_author(&id) {
        Some(author) => {
            AUTHOR_STORE.with(|author_store| author_store.borrow_mut().remove(&id));
            Ok(author)
        }
        None => Err(Error::NotFound {
            message: format!("Author with ID {} not found. Cannot delete.", id),
        }),
    }
}

pub fn insert_author(author: &Author) {
    AUTHOR_STORE.with(|author_store| {
        author_store.borrow_mut().insert(author.id, author.clone());
    });
}

fn get_author(id: &Principal) -> Option<Author> {
    AUTHOR_STORE.with(|author_store| author_store.borrow().get(id))
}

pub fn get_author_by_name(name: &String) -> Option<Author> {
    AUTHOR_STORE.with(|author_store| {
        let store = author_store.borrow();
        for (_key, author) in store.iter() {
            if &author.name == name {
                return Some(author.clone());
            }
        }
        None
    })
}
