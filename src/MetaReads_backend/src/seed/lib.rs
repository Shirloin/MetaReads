use crate::author::lib::seed_author;
use crate::book::lib::seed_book;
use crate::genre::lib::seed_genre;
use crate::plan::lib::seed_plan;

pub async fn seed_data() {
    let plans = vec![
        seed_plan("Free".to_string(), 10, 100).await,
        seed_plan("Standard".to_string(), 20, 200).await,
        seed_plan("Premium".to_string(), 30, 300).await,
    ];

    let authors = vec![
        seed_author("John Doe".to_string()).await.unwrap(),
        seed_author("Sophia Green".to_string()).await.unwrap(),
        seed_author("Mark Turner".to_string()).await.unwrap(),
        seed_author("Alex Johnson".to_string()).await.unwrap(),
    ];

    let genres = vec![
        seed_genre("Adventure".to_string()).await.unwrap(),
        seed_genre("Romance".to_string()).await.unwrap(),
        seed_genre("Horror".to_string()).await.unwrap(),
        seed_genre("Technology".to_string()).await.unwrap(),
    ];
    if let (Some(author1), Some(genre1)) = (authors.get(0), genres.get(0)) {
        seed_book(
            "This Testing for Reading Book".to_string(),
            "This Book for Reading Only".to_string(),
            "https://www.reddit.com/media?url=https%3A%2F%2Fi.redd.it%2F99qxfe2j7pk71.jpg".to_string(),
            author1.id,
            genre1.id,
            12,
            "https://firebasestorage.googleapis.com/v0/b/hackaton-5c2b6.appspot.com/o/20000-Leagues-Under-the-Sea.pdf?alt=media&token=007762dc-f73b-439b-bd75-c993514d6866".to_string(),
            "Free".to_string(),
        ).await;
        seed_book(
            "The Mysterious Adventure gen 0".to_string(),
            "A thrilling adventure through unknown lands, filled with mystery and excitement.".to_string(),
            "https://99designs-blog.imgix.net/blog/wp-content/uploads/2020/11/attachment_122099194-e1606150293120.jpg?auto=format&q=60&fit=max&w=930".to_string(),
            author1.id,
            genre1.id,
            12,
            "hahahihi".to_string(),
            "Free".to_string(),
        ).await;
        seed_book(
            "The Mysterious Adventure gen 0".to_string(),
            "A thrilling adventure through unknown lands, filled with mystery and excitement."
                .to_string(),
            "https://th.bing.com/th/id/OIP.tri5pcbkBl8M-Rv6U3uObAHaL2?rs=1&pid=ImgDetMain"
                .to_string(),
            author1.id,
            genre1.id,
            12,
            "hahahihi".to_string(),
            "Free".to_string(),
        )
        .await;
    }

    if let (Some(author2), Some(genre2)) = (authors.get(1), genres.get(1)) {
        seed_book(
            "Love and Destiny".to_string(),
            "A heartwarming story about love, fate, and the choices that shape our lives."
                .to_string(),
            "https://th.bing.com/th/id/OIP.uUra-zVv-Ug0Kbo83QyepAHaL2?pid=ImgDet&w=474&h=758&rs=1"
                .to_string(),
            author2.id,
            genre2.id,
            12,
            "hahahihi".to_string(),
            "Free".to_string(),
        )
        .await;
        seed_book(
            "Haha hihi".to_string(),
            "A heartwarming story about love, fate, and the choices that shape our lives."
                .to_string(),
            "https://th.bing.com/th/id/OIP.uUra-zVv-Ug0Kbo83QyepAHaL2?pid=ImgDet&w=474&h=758&rs=1"
                .to_string(),
            author2.id,
            genre2.id,
            12,
            "hahahihi".to_string(),
            "Free".to_string(),
        )
        .await;
    }
    if let (Some(author3), Some(genre3)) = (authors.get(2), genres.get(2)) {
        seed_book(
            "The Dark Woods".to_string(),
            "A chilling tale of survival in a haunted forest where no one can hear you scream."
                .to_string(),
            "https://1.bp.blogspot.com/-HRRu6dw6FTI/UiGGOYfeeII/AAAAAAAAAV4/aLFjY4lAAXkpQzVzVrmi0Nicu-kNwqeKwCPcB/s1600/german.jpg"
                .to_string(),
            author3.id,
            genre3.id,
            12,
            "hahahihi".to_string(),
            "Premium".to_string(),
        )
        .await;
    }
    if let (Some(author4), Some(genre4)) = (authors.get(3), genres.get(3)) {
        seed_book(
            "The Code Master's Handbook".to_string(),
            "A comprehensive guide for aspiring developers and seasoned coders alike."
                .to_string(),
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198"
                .to_string(),
            author4.id,
            genre4.id,
            12,
            "hahahihi".to_string(),
            "Premium".to_string(),
        )
        .await;
    }

    ic_cdk::println!("Seeded author, genre, and book successfully!");
}
