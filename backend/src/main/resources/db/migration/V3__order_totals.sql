
alter table orders
    add column total_amount numeric(10, 2) not null default 0,
    add column currency     varchar(3)     not null default 'RON';

alter table orders
    add constraint orders_total_check check (total_amount >= 0);