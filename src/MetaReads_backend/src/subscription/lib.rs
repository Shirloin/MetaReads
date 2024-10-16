use chrono::{Duration, Utc};
use ic_cdk::api::time;

use super::model::{Subscription, SubscriptionPayload};
use crate::{
    error::error::Error,
    helper::helper::generate_unique_id,
    plan::lib::get_plan_by_id,
    user::lib::{get_user_by_id, update_user_balance},
};

#[ic_cdk::update]
async fn create_subscription(payload: SubscriptionPayload) -> Result<Subscription, Error> {
    let mut user = match get_user_by_id(&payload.user_id) {
        Some(ref user) => user.clone(),
        None => {
            return Err(Error::NotFound {
                message: "User not found".to_string(),
            })
        }
    };
    let plan = match get_plan_by_id(&payload.plan_id) {
        Some(ref plan) => plan.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Plan not found".to_string(),
            })
        }
    };

    let mut cost = 0;
    let start_date = Utc::now().timestamp();
    let end_date;

    if payload.frequency == "Yearly" {
        cost = plan.price_per_year;
        end_date = (Utc::now() + Duration::days(365)).timestamp()
    } else {
        cost = plan.price_per_month;
        end_date = (Utc::now() + Duration::days(30)).timestamp()
    }

    if user.money < cost {
        return Err(Error::PaymentProcessingError {
            message: "Balance not enough".to_string(),
        });
    } else {
        update_user_balance(&mut user, cost * -1);
    }

    let id = generate_unique_id().await;
    let subscription = Subscription {
        id,
        plan: plan,
        user: user,
        subscription_start_date: start_date,
        subscription_end_date: end_date,
    };
    Ok(subscription)
}
