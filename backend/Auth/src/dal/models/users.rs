use std::time::SystemTime;

use serde::Serialize;

use crate::dal::schema::users;

#[derive(Insertable)]
#[table_name = "users"]
pub struct NewUser<'a> {
    pub username: &'a str,
    pub password: &'a str,
    pub email: &'a str,
    pub created_on: &'a SystemTime,
}

#[derive(Debug, Queryable, AsChangeset)]
#[table_name = "users"]
pub struct UpdateUser<'a> {
    pub user_id: &'a i32,
    pub username: &'a str,
    pub password: &'a str,
    pub email: &'a str,
}

#[derive(Debug, Queryable)]
pub struct User {
    pub user_id : i32,
    pub username : String,
    pub password: String,
    pub email: String,
    pub created_on: SystemTime,
}

#[derive(Queryable)]
pub struct UserView {
    pub user_id : i32,
    pub username : String,
    pub email: String,
    pub created_on: SystemTime,
}

#[derive(Debug, Queryable, Serialize)]
pub struct UserLogin<'a> {
    pub username: &'a str,
    pub password: &'a str,
}