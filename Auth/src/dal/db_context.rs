use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

pub fn get_connection() -> PgConnection {
    dotenv().ok();

    let db_url = env::var("DATABASE_URL")
        .expect("db url must be set!");

    return PgConnection::establish(&db_url)
        .expect(&format!("Error conecting to {}", db_url));
}