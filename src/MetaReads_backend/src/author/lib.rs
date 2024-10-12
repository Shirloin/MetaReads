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
    let id = generate_unique_id().await;
    let author = Author {
        id,
        name: payload.name,
    };
    AUTHOR_STORE.with(|author_store| {
        author_store.borrow_mut().insert(id, author.clone());
    });
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
