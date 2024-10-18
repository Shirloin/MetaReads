export default function BookModel({
  title,
  author,
  price,
  genre,
  summary,
  coverImage,
}) {
  return {
    title,
    author,
    price,
    genre,
    summary,
    coverImage,
  };
}

export const dummyBookData = {
  title: "A VERY VERY LONG TITLE",
  author: "Vasang",
  price: "6.969.69",
  genre: "Testing",
  summary:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quisquam cupiditate velit officiis molestias hic.",
  coverImage:
    "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/art-book-cover-design-template-34323b0f0734dccded21e0e3bebf004c_screen.jpg?ts=1637015198",
};

export const dumyBook = BookModel(dummyBookData);
