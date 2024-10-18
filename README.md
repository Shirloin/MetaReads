# `MetaReads`

Welcome to your new `MetaReads` project and to the Internet Computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with `MetaReads`, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Rust Canister Development Guide](https://internetcomputer.org/docs/current/developer-docs/backend/rust/)
- [ic-cdk](https://docs.rs/ic-cdk)
- [ic-cdk-macros](https://docs.rs/ic-cdk-macros)
- [Candid Introduction](https://internetcomputer.org/docs/current/developer-docs/backend/candid/)

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd MetaReads/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

### Note on frontend environment variables

## Book Reference
#### Get all books

```http
get_all_book(page, limit, query)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `usize` | **Required**.|
| `limit`      | `usize` | **Required**.|
| `query`      | `String` | **Optional**.|

Return array of books

Return Ex:

book = {
    id,
    title,
    description,
    cover_image,
    author: {id, name}, 
    genre: {id, name},
    plan,
    views,
    page_count, 
    created_at,
    updated_at,
  }

[
  book1, book2, book3
]

#### Get book

```http
get_book({id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|

Return Book or Error

#### Get Popular Book

```http
get_popular_book()
```
Return 10 books with the most views

#### Get Latest Release Book

```http
get_latest_release_book()
```
Return 20 books with the newest release

#### Get Book By Genre

```http
get_book_by_genre({genre_id})
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `genre_id`      | `Principal` | **Required**.|

Return books filtered by the genre

#### Create Book

```http
create_book({title, description, cover_image, author_id, genre_id, plan, page_count})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**.|
| `description`      | `string` | **Required**.|
| `cover_image`      | `string` | **Required**.|
| `author_id`      | `Principal` | **Required**.|
| `genre_id`      | `Principal` | **Required**.|
| `plan`      | `string` | **Required**.|
| `page_count`      | `i64` | **Required**.|

Return Book or Error

#### Update Book

```http
update_book({id, title, description, cover_image, author_id, genre_id, plan, page_count})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|
| `title`      | `string` | **Required**.|
| `description`      | `string` | **Required**.|
| `cover_image`      | `string` | **Required**.|
| `author_id`      | `Principal` | **Required**.|
| `genre_id`      | `Principal` | **Required**.|
| `plan`      | `string` | **Required**.|
| `page_count`      | `i64` | **Required**.|

Return Book or Error

#### Delete Book

```http
delete_book({id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|

Return Book or Error



## User Reference

#### Create User

```http
create_user({username, password})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|

Return User or Error

#### Update User

```http
update_user({id, username, password, image, money})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|
| `username`      | `string` | **Required**.|
| `password`      | `string` | **Optional**.|
| `image`      | `string` | **Optional**.|
| `money`      | `u64` | **Optional**.|

Return User or Error

#### Get User

```http
get_user({id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|

Return User or Error
User{
  id,
  username, 
  password,
  image,
  money,
  subscription{
    plan{
      name
    }
  }
}

#### Login

```http
login({username, password})
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|

Return User or Error


## Genre Reference

#### Create Genre

```http
create_genre({name})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.|

Return Genre or Error
#### Get All Genre

```http
get_all_genre()
```
Return array of genre

#### Update Genre

```http
update_genre({id, name})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|
| `name`      | `string` | **Required**.|

Return Genre or Error

#### Delete Genre

```http
delete_genre({id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|

Return Genre or Error

## Author Reference

#### Create Author

```http
create_author({name})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.|

Return Author or Error

#### Get All Author

```http
get_all_author()
```
Return array of author

#### Update Author

```http
update_author({id, name})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|
| `name`      | `string` | **Required**.|

Return Author or Error

#### Delete Author

```http
delete_author({id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|

Return Author or Error

## Library Reference

#### Create Library

```http
create_library({name user_id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `String` | **Required**.|
| `user_id`      | `Principal` | **Required**.|

Return Library or Error

#### Insert Book To Library

```http
insert_book_to_library({id, book_id, user_id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Optional**.|
| `book_id`      | `Principal` | **Required**.|
| `user_id`      | `Principal` | **Required**.|

If id is not passed then it will create a new library with default name "..."
If its passed then it will add book to the library

Return Library or Error

#### Remove Book In Library

```http
remove_book_in_library({id, book_id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|
| `book_id`      | `Principal` | **Required**.|

Return Library or Error

#### Delete Library

```http
delete_library({id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `Principal` | **Required**.|

Return Library or Error

#### Get Library By User

```http
get_library_by_user({user_id})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `Principal` | **Required**.|

Return array of library (user, book)

## Subscription Reference

#### Create Subscription

```http
create_subscription({plan_id, user_id, frequency})
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `plan_id`      | `Principal` | **Required**.|
| `user_id`      | `Principal` | **Required**.|
| `frequency`      | `Principal` | **String(Monthly or Yearly)**.|

Return Subscription or Error

#### Get Subscription By User

```http
get_subscription_by_user(user_id)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_id`      | `Principal` | **Required**.|

Return Subscription or None


If you are hosting frontend code somewhere without using DFX, you may need to make one of the following adjustments to ensure your project does not fetch the root key in production:

- set`DFX_NETWORK` to `ic` if you are using Webpack
- use your own preferred method to replace `process.env.DFX_NETWORK` in the autogenerated declarations
  - Setting `canisters -> {asset_canister_id} -> declarations -> env_override to a string` in `dfx.json` will replace `process.env.DFX_NETWORK` with the string in the autogenerated declarations
- Write your own `createActor` constructor
