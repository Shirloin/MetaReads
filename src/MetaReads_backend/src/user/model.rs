use std::{borrow::Cow, cell::RefCell};

use candid::{CandidType, Principal};
use ic_stable_structures::{storable::Bound, BTreeMap, DefaultMemoryImpl, Storable};
use serde::{Deserialize, Serialize};

type UserStore = BTreeMap<Principal, User, DefaultMemoryImpl>;

thread_local! {
    static User_STORE: RefCell<BTreeMap<Principal, User, DefaultMemoryImpl>> =
    RefCell::new(BTreeMap::init(DefaultMemoryImpl::default()));
}

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct User {
    id: Principal,
    username: String,
    password: String,
    image: String,
    money: u32,
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
