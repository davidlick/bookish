create table if not exists renters
(
    id varchar(255) not null primary key,
    created_at datetime not null,
    updated_at datetime not null,
    name varchar(255) not null,
    address varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(255) not null
);

create table if not exists rentals
(
    id varchar(255) not null primary key,
    created_at datetime not null,
    updated_at datetime not null,
    book_title varchar(255) not null,
    renter_id varchar(255) not null,
    rental_date datetime not null,
    return_date datetime null,
    foreign key (renter_id) references renters(id)
);
