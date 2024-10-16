use serde::{Deserialize, Serialize};

#[derive(candid::CandidType, Deserialize, Serialize)]
pub enum Error {
    ValidationErrors { errors: String },
    NotFound { message: String },
    NotAuthorized { message: String },
    PaymentProcessingError { message: String },
}
