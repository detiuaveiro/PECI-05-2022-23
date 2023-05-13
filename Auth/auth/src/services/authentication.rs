use std::time::SystemTime;

use crate::dal::{models::users::UserLogin, db_context::get_connection, models::tokens::{Token, UpdateToken, NewToken}};
use diesel::{QueryDsl, RunQueryDsl};
use jwt_simple::reexports::rand::{distributions::{Alphanumeric, DistString}, self};

use self::models::JwtToken;

use super::user::login;

pub mod models {
    pub struct JwtToken {
        pub token : String,
        pub refresh_token : String
    }
}

fn get_new_key() -> JwtToken {
    return JwtToken{
        token : Alphanumeric.sample_string(&mut rand::thread_rng(), 255),
        refresh_token : Alphanumeric.sample_string(&mut rand::thread_rng(), 255),
    };
}

pub fn authenticate(user_credentials : UserLogin) -> Result<JwtToken, String> {
    use crate::dal::schema::tokens::dsl::*;

    let login_result = login(user_credentials);
    let new_key = get_new_key();
    match login_result {
        Ok(user_record) => {
            let connection = &mut get_connection();
            
            let token_search_result : Result<Token, _> = tokens
                .find(user_record.user_id)
                .first::<Token>(connection);
            

            
            
            match token_search_result {
                Err(_) => {
                    print!("Creating token!!!!!");
                    //create token
                    match diesel::insert_into(tokens)
                        .values(NewToken{ user_id: (user_record.user_id), created_on: (SystemTime::now()), last_login: (SystemTime::now()), token: (new_key.token.to_string()), refresh_token: (new_key.refresh_token.to_string()) })
                        .execute(connection) {
                            Err(_) => {
                                return Err(String::from("Error creating token..."));
                            },
                            _ => ()
                        }
                },
                _ => {
                    diesel::update(tokens.find(user_record.user_id))
                        .set(UpdateToken{
                            last_login : SystemTime::now(),
                            refresh_token : new_key.refresh_token.to_string(),
                            token : new_key.token.to_string()
                        })
                        .execute(connection).expect("Error updating token!");
                        }
            }
            return Ok(JwtToken { token: (new_key.token), refresh_token: (new_key.refresh_token) });
        },
        Err(e) => return Err(e)
    }
}
