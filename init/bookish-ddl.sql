create table renters
(
	id int auto_increment primary key,
	name varchar(255) not null,
	address varchar(255) not null,
	email varchar(255) not null,
	phone_number varchar(255) not null
);

create unique index renters_id_uindex
	on renters (id);

create table rentals
(
    id int auto_increment primary key,
    renter_id int not null,
    rental_date datetime not null,
    return_date datetime null,
    book_title varchar(255) not null,
    foreign key (renter_id) references renters(id)
);
