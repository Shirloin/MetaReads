use crate::author::lib::seed_author;
use crate::book::lib::seed_book;
use crate::genre::lib::seed_genre;
use crate::plan::lib::seed_plan;

pub async fn seed_data() {
    let plans = vec![
        seed_plan("Basic".to_string(), 10, 100).await,
        seed_plan("Standard".to_string(), 20, 200).await,
        seed_plan("Premium".to_string(), 30, 300).await,
    ];

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
                        let _ = seed_book(book_title, author.id, genre.id).await;
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
