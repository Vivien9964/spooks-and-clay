alter table product rename column portfolio_featured to featured;
alter index idx_product_portfolio rename to idx_product_featured;

alter table product
    add column height_cm numeric(4, 1),
    add column width_cm  numeric(4, 1),
    add column weight_g  integer,
    add constraint product_height_check check (height_cm > 0),
    add constraint product_width_check  check (width_cm > 0),
    add constraint product_weight_check check (weight_g > 0);

create table product_materials (
    product_id     bigint       not null,
    material_order integer      not null,
    material       varchar(100) not null,
    primary key (product_id, material_order),
    constraint fk_product_materials_product
    foreign key (product_id) references product (id) on delete cascade
);