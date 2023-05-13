use crate::dal::models::roles::{Role, NewRole};
use crate::dal::db_context::get_connection;
use crate::dal::models::users_roles::UserRole;
use diesel::prelude::*;

use super::user::get_user;

pub fn get_roles(user_token: &str) -> Result<Vec<Role>, String> {
    use crate::dal::schema;
    let user_result = get_user(String::from(user_token));
    let connection = &mut get_connection();
    match user_result {
        Ok(user_record) => {
            let mut roles : Vec<Role> = vec![];

            let user_roles : Result<Vec<UserRole>,_> = schema::users_roles::dsl::users_roles
                .filter(schema::users_roles::dsl::user_id.is_not_distinct_from(user_record.user_id))
                .load::<UserRole>(connection);

            if user_roles.is_ok() {
                for user_role in user_roles.unwrap() {
                    let role_record : Result<Role, _> = schema::roles::dsl::roles
                        .find(user_role.role_id)
                        .first::<Role>(connection);
                    if role_record.is_ok() {
                        roles.push(role_record.unwrap());
                    }
                }
            }
            return Ok(roles);
        },
        Err(e) => return Err(e),
    }
}


pub fn create_role(new_role_name : &str) -> bool {
    use crate::dal::schema::roles::dsl::*;
    let mut connection = get_connection();
    let new_role = NewRole{role_name : String::from(new_role_name)};

    let result = diesel::insert_into(roles)
        .values(new_role)
        .execute(&mut connection);
    if result.is_ok() {
        return true;
    }
    return false;
}
