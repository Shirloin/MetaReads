#[ic_cdk::update]
fn update(name: String) -> String {
    format!("Hello, {}!", name)
}

#[ic_cdk::query]
fn bla(name: String) -> String {
    format!("Hello, {}!", name)
}
