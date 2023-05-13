use std::time::SystemTime;

use rocket::serde::json::Json;

use crate::{dal::models::users::NewUser, services::user::{register, get_user}};

use self::models::{RegisterUser, UserRegisterResult, UserReturn};

mod models {
    use std::time::SystemTime;

    use serde::{Serialize, Deserialize};

    #[derive(Serialize)]
    pub struct UserReturn{
        pub user_id : i32,
        pub username : String,
        pub email : String,
        pub created_on : SystemTime
    }

    #[derive(Deserialize)]
    pub struct RegisterUser {
        pub username : String,
        pub password : String,
        pub email : String,
    }

    #[derive(Serialize)]
    pub struct UserRegisterResult{
        pub success : bool,
    }

}

#[get("/user?<token>", format = "json")]
pub fn get_info(token : &str) -> Result<Json<UserReturn>,String> {
    let user_resut = get_user(format!("{}",token));
    if !user_resut.is_ok() {
        return Err(String::from("Invalid token..."));
    }else{
        let user_record = user_resut.unwrap();
        let user_return = UserReturn{
            user_id : user_record.user_id,
            created_on : user_record.created_on,
            email : user_record.email,
            username : user_record.username
        };
        return std::result::Result::Ok(Json(user_return));
    }
}

#[post("/user", format = "json", data="<user_data>")]
pub fn register_user(user_data: Json<RegisterUser>) -> Json<UserRegisterResult>{
    let user_record = NewUser{
        username : &user_data.username,
        email : &user_data.email,
        password : &user_data.password,
        created_on : &SystemTime::now()
    };
    return Json(UserRegisterResult{
        success : register(&user_record)
    });
}
