use crate::dal::schema::roles;

#[derive(Insertable)]
#[table_name = "roles"]
pub struct NewRole {
    pub role_name : String
}


#[derive(Queryable)]
pub struct Role {
    pub role_id : i32,
    pub role_name : String
}

