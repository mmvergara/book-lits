create table
  public.users (
    id uuid not null default gen_random_uuid (),
    username character varying not null,
    password text not null,
    created_at timestamp with time zone not null default now(),
    constraint users_pkey primary key (id),
    constraint users_username_key unique (username)
  ) tablespace pg_default;

create table
  public.publisher (
    id uuid not null default gen_random_uuid (),
    name text not null,
    created_at timestamp with time zone not null default now(),
    constraint publisher_pkey primary key (id),
    constraint publisher_name_key unique (name)
  ) tablespace pg_default;


create table
  public.books (
    id uuid not null default gen_random_uuid (),
    name text not null,
    created_at timestamp with time zone not null default now(),
    author uuid not null,
    publisher uuid not null,
    constraint books_pkey primary key (id),
    constraint books_author_fkey foreign key (author) references users (id) on update cascade on delete cascade,
    constraint books_publisher_fkey foreign key (publisher) references publisher (id) on update cascade on delete cascade
  ) tablespace pg_default;