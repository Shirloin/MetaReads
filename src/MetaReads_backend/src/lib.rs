#![allow(non_snake_case)]
use std::cell::RefCell;

use candid::Principal;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};

use crate::author::model::{Author, AuthorPayload};
use crate::book::model::{Book, BookPayload};
use crate::error::error::Error;
use crate::genre::model::{Genre, GenrePayload};
use crate::library::model::{Library, LibraryPayload};
use crate::plan::model::{Plan, PlanPayload};
use crate::user::model::{User, UserPayload};
mod author;
mod book;
mod error;
mod genre;
mod helper;
mod library;
mod plan;
mod user;

type Memory = VirtualMemory<DefaultMemoryImpl>;
type UserStore = StableBTreeMap<Principal, User, Memory>;
type GenreStore = StableBTreeMap<Principal, Genre, Memory>;
type AuthorStore = StableBTreeMap<Principal, Author, Memory>;
type BookStore = StableBTreeMap<Principal, Book, Memory>;
type LibraryStore = StableBTreeMap<Principal, Library, Memory>;
type PlanStore = StableBTreeMap<Principal, Plan, Memory>;

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
    pub static LIBRARY_STORE: RefCell<LibraryStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(4)))
    ));
    pub static PLAN_STORE: RefCell<PlanStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(5)))
    ));
}

#[ic_cdk::init]
async fn init() {}

ic_cdk::export_candid!();
