use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use validator::Validate;
#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct User {
    pub id: Principal,
    pub username: String,
    pub password: String,
    pub image: String,
    pub money: u32,
}

impl Storable for User {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize, Default, Validate)]
pub struct UserPayload {
    #[validate(length(min = 1))]
    pub username: String,
    #[validate(length(min = 5))]
    pub password: String,
    pub image: String,
    pub money: Option<u32>,
}

#[derive(CandidType, Deserialize, Serialize)]
pub struct UserResponse {
    pub user: User,
    pub message: String,
}
