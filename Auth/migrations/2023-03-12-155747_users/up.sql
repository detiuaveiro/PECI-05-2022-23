CREATE TABLE users (
    user_id    SERIAL PRIMARY KEY,
    username   VARCHAR UNIQUE NOT NULL,
    password   VARCHAR NOT NULL,
    email      VARCHAR UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL
);

CREATE TABLE tokens(
  user_id INT UNIQUE NOT NULL,
  created_on TIMESTAMP NOT NULL,
  last_login TIMESTAMP NOT NULL,
  token   VARCHAR UNIQUE NOT NULL,
  refresh_token VARCHAR UNIQUE NOT NULL,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id)
      REFERENCES users (user_id)
);

CREATE TABLE roles(
   role_id serial PRIMARY KEY,
   role_name VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE users_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  grant_date TIMESTAMP NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (role_id)
      REFERENCES roles (role_id),
  FOREIGN KEY (user_id)
      REFERENCES users (user_id)
);

INSERT INTO users (
	username, password, email, created_on)
	VALUES ('admin', 'admin', 'admin@peci.com', NOW());

INSERT INTO users (
	username, password, email, created_on)
	VALUES ('test', 'test', 'test@peci.com', NOW());

INSERT INTO users (
	username, password, email, created_on)
	VALUES ('guest', 'guest', 'guest@peci.com', NOW());

INSERT INTO roles (
	role_name)
	VALUES ('admin');

INSERT INTO roles (
	role_name)
	VALUES ('user');

INSERT INTO roles (
	role_name)
	VALUES ('guest');

INSERT INTO users_roles(
	user_id, role_id, grant_date)
	VALUES (1, 1, NOW());

INSERT INTO users_roles(
	user_id, role_id, grant_date)
	VALUES (2, 2, NOW());

INSERT INTO users_roles(
	user_id, role_id, grant_date)
	VALUES (3, 3, NOW());
