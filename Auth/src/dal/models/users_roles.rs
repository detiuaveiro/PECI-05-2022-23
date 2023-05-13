use std::time::SystemTime;
use crate::dal::schema::users_roles;


#[derive(Insertable)]
#[table_name = "users_roles"]
pub struct NewUserRole {
    pub user_id : i32,
    pub role_id : i32,
    pub grant_date : SystemTime,
}


#[derive(Queryable)]
pub struct UserRole {
    pub user_id : i32,
    pub role_id : i32,
    pub grant_date : SystemTime,
}
