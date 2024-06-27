create table
  public.books (
    id uuid not null default gen_random_uuid (),
    name text not null,
    created_at timestamp with time zone not null default now(),
    author uuid not null,
    publisher uuid not null,
    constraint books_pkey primary key (id),
    constraint books_author_fkey foreign key (author) references users (id) on update cascade on delete cascade,
    constraint books_publisher_fkey foreign key (publisher) references publishers (id) on update cascade on delete cascade
  ) tablespace pg_default;
create table
  public.publishers (
    id uuid not null default gen_random_uuid (),
    name text not null,
    created_at timestamp with time zone not null default now(),
    owner uuid not null,
    constraint publisher_pkey primary key (id),
    constraint publisher_name_key unique (name),
    constraint publisher_owner_fkey foreign key (owner) references users (id) on update cascade on delete cascade
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
    constraint books_publisher_fkey foreign key (publisher) references publishers (id) on update cascade on delete cascade
  ) tablespace pg_default;