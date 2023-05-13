// @generated automatically by Diesel CLI.

diesel::table! {
    roles (role_id) {
        role_id -> Int4,
        role_name -> Varchar,
    }
}

diesel::table! {
    tokens (user_id) {
        user_id -> Int4,
        created_on -> Timestamp,
        last_login -> Timestamp,
        token -> Varchar,
        refresh_token -> Varchar,
    }
}

diesel::table! {
    users (user_id) {
        user_id -> Int4,
        username -> Varchar,
        password -> Varchar,
        email -> Varchar,
        created_on -> Timestamp,
    }
}

diesel::table! {
    users_roles (user_id, role_id) {
        user_id -> Int4,
        role_id -> Int4,
        grant_date -> Timestamp,
    }
}

diesel::joinable!(tokens -> users (user_id));
diesel::joinable!(users_roles -> roles (role_id));
diesel::joinable!(users_roles -> users (user_id));

diesel::allow_tables_to_appear_in_same_query!(
    roles,
    tokens,
    users,
    users_roles,
);
