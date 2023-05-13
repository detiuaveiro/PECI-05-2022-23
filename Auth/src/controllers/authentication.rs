use rocket::serde::json::Json;

use crate::{services::authentication::authenticate, dal::models::users::UserLogin};

use self::models::UserCredentials;

pub mod models {
    use serde::{Serialize, Deserialize};

    #[derive(Deserialize)]
    pub struct UserCredentials<'r>{
        pub username : &'r str,
        pub password : &'r str
    }

    #[derive(Serialize)]
    pub struct Tokens{
        pub token : String,
        pub refresh_token : String
    }
}

#[post("/login", format = "json", data = "<user_credentials>")]
pub fn login(user_credentials: Json<UserCredentials>) -> Result<Json<models::Tokens>, String> {
    let creds = UserLogin{
        username : user_credentials.username,
        password : user_credentials.password
    };
    let res = authenticate(creds);
    match res {
        Ok(t) => return Ok(Json(models::Tokens{
            token : t.token.to_string(),
            refresh_token : t.refresh_token.to_string()
        })),
        Err(e) => return Err(e),
    }
}
