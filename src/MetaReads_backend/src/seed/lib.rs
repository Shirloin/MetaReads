use crate::author::lib::seed_author;
use crate::author::model::{Author, AuthorPayload};
use crate::book::lib::seed_book;
use crate::genre::lib::seed_genre;

pub async fn seed_data() {
    let authors = vec![
        seed_author("John Doe".to_string()).await,
        seed_author("Shirloin".to_string()).await,
        seed_author("Jane Smith".to_string()).await,
    ];

    let genres = vec![
        seed_genre("Action".to_string()).await,
        seed_genre("Thriller".to_string()).await,
        seed_genre("Science Fiction".to_string()).await,
    ];

    if authors.iter().all(Option::is_some) && genres.iter().all(Option::is_some) {
        // Iterate to create books
        let mut book_count = 0;

        for author in &authors {
            if let Some(author) = author {
                for genre in &genres {
                    if let Some(genre) = genre {
                        let book_title = format!("Book {} by {}", book_count + 1, author.name);
                        let book = seed_book(book_title, author.id, genre.id).await;
                        book_count += 1;

                        if book_count >= 15 {
                            break;
                        }
                    }
                }
            }
            if book_count >= 15 {
                break;
            }
        }
    }

    ic_cdk::println!("Seeded author, genre, and book successfully!");
}
