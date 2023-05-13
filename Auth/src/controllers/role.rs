use rocket::serde::json::Json;

use crate::services::role::{get_roles, create_role};

use self::models::{RolesResult, RegisterRoleResult, RegisterRole};

mod models {
    use serde::{Serialize, Deserialize};

    #[derive(Serialize)]
    pub struct RolesResult {
        pub roles : Vec<String>
    }

    #[derive(Deserialize)]
    pub struct RegisterRole {
        pub role : String
    }

    #[derive(Serialize)]
    pub struct RegisterRoleResult {
        pub created : bool
    }
}


#[get("/roles?<token>", format = "json")]
pub fn get_roles_by_token(token : &str) -> Result<Json<RolesResult>,String> {
    let service_result = get_roles(token);
    match service_result {
        Ok(roles) => {
            let mut role_names : Vec<String> = vec![];
            for role in roles {
                role_names.push(role.role_name);
            }
            let result = RolesResult{roles : role_names};
            return Ok(Json(result));
        },
        Err(e) => return Err(e),
    }
}

#[post("/role", format = "json", data="<role_data>")]
pub fn register_role(role_data: Json<RegisterRole>) -> Json<RegisterRoleResult>{
    let result = RegisterRoleResult{ created : create_role(&role_data.role) };
    return Json(result);
}
