use crate::dal::models::tokens::Token;
use crate::dal::models::users::*;
use crate::dal::db_context::get_connection;
use diesel::prelude::*;

pub fn get_user(user_token : String) -> Result<UserView, String> {
    use crate::dal::schema::tokens::dsl::*;
    let connection = &mut get_connection();
    let result = tokens
        .filter(token.eq(user_token))
        .first::<Token>(connection);
    if result.is_ok() {
        let token_record = result.unwrap();
        let user_result : Result<User, _>= crate::dal::schema::users::dsl::users
            .filter(crate::dal::schema::users::dsl::user_id.is_not_distinct_from(token_record.user_id))
            .first::<User>(connection);

        match user_result {
            Ok(user_record ) => {
                return Ok(UserView { user_id: (user_record.user_id), username: (user_record.username), email: (user_record.email), created_on: (user_record.created_on) });
            },
            _ => return Err(String::from("User not found..."))
        }
    }else{
        return Err(String::from("Token not valid..."));
    }
}


pub fn login(user_credentials:  UserLogin) -> Result<UserView, String> {
    use crate::dal::schema::users::dsl::*;
    let connection = &mut get_connection();
    let result = users
        .filter(username.eq(user_credentials.username))
        .filter(password.eq(user_credentials.password))
        .first::<User>(connection);

    match result {
        Ok(query_res) => return Ok(UserView { user_id: (query_res.user_id), username: (query_res.username), email: (query_res.email), created_on: (query_res.created_on) }),
        Err(_) => return Err(String::from("Invalid user credentials..."))
    }
}

pub fn register(user_credentials: &NewUser) -> bool {
    use crate::dal::schema::users::dsl::*;

    let mut connection = get_connection();

    let result = diesel::insert_into(users)
        .values(user_credentials)
        .execute(&mut connection);
    
    match result {
        Ok(_) => return true,
        Err(_) => return false 
    }
}

pub fn update(user_info: UpdateUser) -> bool {
    use crate::dal::schema::users::dsl::*;

    let mut connection = get_connection();

    let result = diesel::update(
        users.find(user_info.user_id))
            .set(&user_info)
            .execute(&mut connection);
    
    match result {
        Ok(_) => return true,
        Err(_) => return false 
    }
}
