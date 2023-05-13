#[macro_use]
extern crate diesel; 

mod dal;
mod services;
mod controllers;

#[macro_use]
extern crate rocket;


#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/ping", routes![controllers::test::ping])
        .mount("/api", routes![controllers::authentication::login])
        .mount("/api", routes![controllers::user::get_info])
        .mount("/api", routes![controllers::user::register_user])
        .mount("/api", routes![controllers::role::get_roles_by_token])
        .mount("/api", routes![controllers::role::register_role])
}
