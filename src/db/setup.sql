CREATE TABLE
	users (
		id UUID PRIMARY KEY,
		username VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		passhash VARCHAR(255) NOT NULL,
		created_at TIMESTAMP NOT NULL DEFAULT NOW (),
		updated_at TIMESTAMP NOT NULL DEFAULT NOW (),
		constraint users_username_key unique (username),
		constraint users_email_key unique (email)
	);

create table
	loans (
		id UUID primary key default gen_random_uuid(),
		user_id UUID references users(id) on delete cascade,
		servicer_id UUID references servicers(id) on delete cascade,
		nickname varchar(63) not null,
		principle int not null,
		interest_rate float8 not null,
		date_opened date
	);

create table
	servicers (
		id UUID primary key default gen_random_uuid(),
		user_id UUID references users(id) on delete cascade,
		name varchar(63) not null
	);