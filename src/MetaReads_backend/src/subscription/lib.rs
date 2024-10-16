use super::model::{Subscription, SubscriptionPayload};
use crate::{
    error::error::Error,
    helper::helper::generate_unique_id,
    plan::lib::get_plan_by_id,
    user::lib::{get_user_by_id, substract_user_balance},
};
use ic_cdk::api::time;

#[ic_cdk::update]
async fn create_subscription(payload: SubscriptionPayload) -> Result<Subscription, Error> {
    let user = match get_user_by_id(&payload.user_id) {
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

    let cost;
    let start_date = time() / 1_000_000_000;
    let end_date;

    if payload.frequency == "Yearly" {
        cost = plan.price_per_year;
        end_date = start_date + 365 * 24 * 60 * 60;
    } else {
        cost = plan.price_per_month;
        end_date = start_date + 30 * 24 * 60 * 60;
    }

    if user.money < cost {
        return Err(Error::PaymentProcessingError {
            message: "Balance not enough".to_string(),
        });
    } else {
        substract_user_balance(&user.id, cost);
    }

    let id = generate_unique_id().await;
    let subscription = Subscription {
        id,
        plan,
        user,
        subscription_start_date: start_date,
        subscription_end_date: end_date,
    };
    Ok(subscription)
}
