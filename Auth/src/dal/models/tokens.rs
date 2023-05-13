use crate::dal::schema::tokens;
use std::time::SystemTime;

#[derive(Insertable)]
#[table_name = "tokens"]
pub struct NewToken {
    pub user_id : i32,
    pub created_on : SystemTime,
    pub last_login : SystemTime,
    pub token : String,
    pub refresh_token : String
}

#[derive(Queryable)]
pub struct Token {
    pub user_id : i32,
    pub created_on : SystemTime,
    pub last_login : SystemTime,
    pub token : String,
    pub refresh_token : String
}


#[derive(Debug, Queryable, AsChangeset)]
#[table_name = "tokens"]
pub struct UpdateToken {
    pub last_login : SystemTime,
    pub token : String,
    pub refresh_token : String
}