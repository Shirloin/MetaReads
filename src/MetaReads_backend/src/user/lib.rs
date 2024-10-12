use validator::Validate;

use super::model::{User, UserPayload, UserResponse};
use crate::error::error::Error;
use crate::helper::helper::generate_unique_id;
use crate::USER_STORE;

#[ic_cdk::update]
async fn create_user(payload: UserPayload) -> Result<UserResponse, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            errors: check_payload.err().unwrap().to_string(),
        });
    }
    let id = generate_unique_id().await;

    let user = User {
        id,
        username: payload.username,
        password: payload.password,
        image: payload.image,
        money: payload.money.unwrap_or(0),
    };
    USER_STORE.with(|user_store| {
        user_store.borrow_mut().insert(id, user.clone());
    });
    let message = format!("User {} has been successfully created", user.username);

    let response = UserResponse { user, message };
    Ok(response)
}

#[ic_cdk::query]
fn get_all_user() -> Vec<User> {
    let mut users = Vec::new();
    USER_STORE.with(|user_store| {
        let store = user_store.borrow();

        for (_key, user) in store.iter() {
            users.push(user.clone());
        }
    });
    return users;
}
