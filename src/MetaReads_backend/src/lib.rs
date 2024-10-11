#![allow(non_snake_case)]
use crate::error::error::Error;
use crate::user::model::{User, UserPayload, UserResponse};
mod error;
mod helper;
mod user;

#[ic_cdk::init]
fn init() {}

ic_cdk::export_candid!();
