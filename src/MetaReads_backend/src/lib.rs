#![allow(non_snake_case)]
use std::cell::RefCell;

use author::lib::insert_author;
use book::lib::insert_book;
use candid::Principal;
use genre::lib::insert_genre;
use helper::helper::generate_unique_id;
use ic_cdk::api::time;
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};

use crate::author::model::{Author, AuthorPayload, AuthorResponse};
use crate::book::model::{Book, BookPayload, BookResponse};
use crate::error::error::Error;
use crate::genre::model::{Genre, GenrePayload, GenreResponse};
use crate::library::model::{Library, LibraryPayload, LibraryResponse};
use crate::user::model::{User, UserPayload, UserResponse};
mod author;
mod book;
mod error;
mod genre;
mod helper;
mod library;
mod user;

type Memory = VirtualMemory<DefaultMemoryImpl>;
type UserStore = StableBTreeMap<Principal, User, Memory>;
type GenreStore = StableBTreeMap<Principal, Genre, Memory>;
type AuthorStore = StableBTreeMap<Principal, Author, Memory>;
type BookStore = StableBTreeMap<Principal, Book, Memory>;
type LibraryStore = StableBTreeMap<Principal, Library, Memory>;

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
}

#[ic_cdk::init]
async fn init() {
    ic_cdk::println!("Initializing data...");
    let fantasy_id = generate_unique_id().await;
    let action_id = generate_unique_id().await;
    let author1_id = generate_unique_id().await;
    let author2_id = generate_unique_id().await;
    let book1_id = generate_unique_id().await;
    let book2_id = generate_unique_id().await;
    let book3_id = generate_unique_id().await;
    let book4_id = generate_unique_id().await;
    let book5_id = generate_unique_id().await;
    let book6_id = generate_unique_id().await;
    let book7_id = generate_unique_id().await;
    let book8_id = generate_unique_id().await;
    let book9_id = generate_unique_id().await;
    let fantasy = Genre {
        id: fantasy_id,
        name: "Fantasy".to_string(),
    };

    let action = Genre {
        id: action_id,
        name: "Action".to_string(),
    };

    let author1 = Author {
        id: author1_id,
        name: "John Doe".to_string(),
    };
    let author2 = Author {
        id: author2_id,
        name: "Mia Smith".to_string(),
    };
    insert_genre(&fantasy);
    insert_genre(&action);
    insert_author(&author1);
    insert_author(&author2);
    let book1 = Book {
        id: book1_id,
        title: "The Enchanted Forest".to_string(),
        description: "A thrilling adventure in a mystical forest.".to_string(),
        cover_image: "url_to_cover_image_1.jpg".to_string(),
        author_id: author1.id,
        genre_id: fantasy.id,
        plan: "Free".to_string(),
        views: 1500,
        page_count: 300,
        created_at: time(),
        updated_at: None,
    };
    let book2 = Book {
        id: book2_id,
        title: "Dragon's Fury".to_string(),
        description: "An epic tale of dragons and heroes.".to_string(),
        cover_image: "url_to_cover_image_2.jpg".to_string(),
        author_id: author1.id,
        genre_id: fantasy.id,
        plan: "Published".to_string(),
        views: 2500,
        page_count: 350,
        created_at: time(),
        updated_at: None,
    };
    let book3 = Book {
        id: book3_id,
        title: "The Last Warrior".to_string(),
        description: "A gripping story of courage and valor.".to_string(),
        cover_image: "url_to_cover_image_3.jpg".to_string(),
        author_id: author2.id,
        genre_id: action.id,
        plan: "Published".to_string(),
        views: 3000,
        page_count: 400,
        created_at: time(),
        updated_at: None,
    };
    let book4 = Book {
        id: book4_id,
        title: "Whispers of the Night".to_string(),
        description: "A haunting tale that unfolds under the moonlight.".to_string(),
        cover_image: "url_to_cover_image_5.jpg".to_string(),
        author_id: author1.id,
        genre_id: fantasy.id,
        plan: "Published".to_string(),
        views: 1800,
        page_count: 320,
        created_at: time(),
        updated_at: None,
    };
    let book5 = Book {
        id: book5_id,
        title: "The Battle for Freedom".to_string(),
        description: "An action-packed journey of rebellion and hope.".to_string(),
        cover_image: "url_to_cover_image_6.jpg".to_string(),
        author_id: author2.id,
        genre_id: action.id,
        plan: "Published".to_string(),
        views: 3500,
        page_count: 450,
        created_at: time(),
        updated_at: None,
    };
    let book6 = Book {
        id: book6_id,
        title: "Legend of the Lost City".to_string(),
        description: "An exploration of an ancient city filled with treasures.".to_string(),
        cover_image: "url_to_cover_image_7.jpg".to_string(),
        author_id: author1.id,
        genre_id: fantasy.id,
        plan: "Published".to_string(),
        views: 4000,
        page_count: 280,
        created_at: time(),
        updated_at: None,
    };
    let book7 = Book {
        id: book7_id,
        title: "The Assassin's Code".to_string(),
        description: "A gripping tale of betrayal and survival.".to_string(),
        cover_image: "url_to_cover_image_8.jpg".to_string(),
        author_id: author2.id,
        genre_id: action.id,
        plan: "Published".to_string(),
        views: 2900,
        page_count: 350,
        created_at: time(),
        updated_at: None,
    };
    let book8 = Book {
        id: book8_id,
        title: "Guardians of the Realm".to_string(),
        description: "A battle between good and evil in a fantastical world.".to_string(),
        cover_image: "url_to_cover_image_9.jpg".to_string(),
        author_id: author1.id,
        genre_id: fantasy.id,
        plan: "Published".to_string(),
        views: 4500,
        page_count: 360,
        created_at: time(),
        updated_at: None,
    };
    let book9 = Book {
        id: book9_id,
        title: "Chasing Shadows".to_string(),
        description: "An exhilarating chase that could change everything.".to_string(),
        cover_image: "url_to_cover_image_10.jpg".to_string(),
        author_id: author2.id,
        genre_id: action.id,
        plan: "Published".to_string(),
        views: 3200,
        page_count: 300,
        created_at: time(),
        updated_at: None,
    };
    insert_book(&book1);
    insert_book(&book2);
    insert_book(&book3);
    insert_book(&book4);
    insert_book(&book5);
    insert_book(&book6);
    insert_book(&book7);
    insert_book(&book8);
    insert_book(&book9);
    ic_cdk::println!("Data initialized successfully.");
}

ic_cdk::export_candid!();
