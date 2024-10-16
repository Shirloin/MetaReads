use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::{author::model::Author, genre::model::Genre};

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Book {
    pub id: Principal,
    pub title: String,
    pub description: String,
    pub cover_image: String,
    pub book_url: String,
    pub author: Author,
    pub genre: Genre,
    pub plan: String,
    pub views: i64,
    pub page_count: i64,
    pub created_at: u64,
    pub updated_at: Option<u64>,
}

impl Storable for Book {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize, Validate)]
pub struct BookPayload {
    pub id: Option<Principal>,
    pub title: String,
    pub description: String,
    pub cover_image: String,
    pub book_url: String,
    pub author_id: Principal,
    pub genre_id: Principal,
    pub plan: String,
    pub page_count: i64,
}
