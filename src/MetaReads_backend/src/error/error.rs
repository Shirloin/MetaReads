use serde::{Deserialize, Serialize};

#[derive(candid::CandidType, Deserialize, Serialize)]
pub enum Error {
    ValidationErrors { errors: String },
    NotFound { msg: String },
    NotAuthorized { msg: String },
}
