#[get("/")]
pub fn ping() -> String {
    return String::from("pong");
}


