#![allow(non_snake_case)]
// mod user;

#[ic_cdk::update]
fn adsf(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::query]
fn bla(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::init]
fn init() {}

ic_cdk::export_candid!();
