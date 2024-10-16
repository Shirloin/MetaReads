use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};

use crate::{plan::model::Plan, user::model::User};

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Subscription {
    pub id: Principal,
    pub plan: Plan,
    pub user: User,
    pub subscription_start_date: i64,
    pub subscription_end_date: i64,
}
impl Storable for Subscription {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize)]
pub struct SubscriptionPayload {
    pub id: Option<Principal>,
    pub frequency: String,
    pub plan_id: Principal,
    pub user_id: Principal,
}
