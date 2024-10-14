#![allow(non_snake_case)]
use std::cell::RefCell;

use candid::Principal;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};

use crate::author::model::{Author, AuthorPayload, AuthorResponse};
use crate::book::model::{Book, BookPayload, BookResponse};
use crate::error::error::Error;
use crate::genre::model::{Genre, GenrePayload, GenreResponse};
use crate::user::model::{User, UserPayload, UserResponse};
mod author;
mod book;
mod error;
mod genre;
mod helper;
mod user;

type Memory = VirtualMemory<DefaultMemoryImpl>;
type UserStore = StableBTreeMap<Principal, User, Memory>;
type GenreStore = StableBTreeMap<Principal, Genre, Memory>;
type AuthorStore = StableBTreeMap<Principal, Author, Memory>;
type BookStore = StableBTreeMap<Principal, Book, Memory>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static USER_STORE: RefCell<UserStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
    ));

    pub static GENRE_STORE: RefCell<GenreStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));
    pub static AUTHOR_STORE: RefCell<AuthorStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2)))
    ));

    pub static BOOK_STORE: RefCell<BookStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3)))
    ));
}

#[ic_cdk::init]
fn init() {}

ic_cdk::export_candid!();
