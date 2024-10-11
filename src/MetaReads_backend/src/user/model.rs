#[macro_use]
use std::{borrow::Cow, cell::RefCell};

use candid::{CandidType, Principal};
use ic_stable_structures::{storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable};
use serde::{Deserialize, Serialize};
use validator::Validate;

type UserStore = StableBTreeMap<Principal, User, DefaultMemoryImpl>;

thread_local! {
    pub static USER_STORE: RefCell<UserStore> =
    RefCell::new(StableBTreeMap::init(DefaultMemoryImpl::default()));
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct User {
    pub id: Principal,
    pub username: String,
    pub password: String,
    pub image: String,
    pub money: u32,
}

impl Storable for User {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        let mut bytes = vec![];
        ciborium::ser::into_writer(&self, &mut bytes).unwrap();
        Cow::Owned(bytes)
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        ciborium::de::from_reader(&*bytes).expect("deserialization must succeed.")
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
