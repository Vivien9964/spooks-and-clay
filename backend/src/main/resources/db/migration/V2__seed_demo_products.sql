
insert into product (name, slug, short_desc, long_desc, price, on_sale, active,
                     discount_percent, stock_count, category, portfolio_featured)
values
    ('Pumpkin Patch Figurine', 'pumpkin-patch-figurine',
     'A chubby little pumpkin with two beady eyes, hand-sculpted from clay.',
     'Hand-sculpted and painted one at a time, so no two are exactly alike. Stands about 6 cm tall and makes a perfect desk companion or shelf decoration throughout the autumn season.',
     89.99, false, true, null, 1, 'autumnScenes', true),

    ('Friendly Ghost Figurine', 'friendly-ghost-figurine',
     'A wobbly little ghost with the biggest eyes, keeping a tiny pumpkin company.',
     'Sculpted with a slightly lopsided face that gives him heaps of personality. Hand-painted with a soft glow-white finish, so no two little faces are ever quite the same.',
     79.99, false, true, null, 1, 'halloweenScenes', true),

    ('Spooky Friends', 'spooky-friends',
     'Just two spooky besties enjoying autumn.',
     'A one-of-a-kind piece combining hand-sculpted ghosts with a moss base in an autumnal scene. Roughly 9 cm at its tallest point.',
     119.99, false, true, null, 1, 'uniquePieces', true),

    ('Autumn Collection', 'autumn-collection',
     'A full autumn scene: pumpkins, moss, and tiny props.',
     'The largest piece in the shop. A complete assembled scene on a wooden base, combining several sculpted elements into a single display.',
     149.99, false, true, null, 1, 'collections', false);

insert into product_images (product_id, image_order, src, alt)
select id, 0, '/products/pumpkin-1.jpg', 'Pumpkin Patch Figurine' from product where slug = 'pumpkin-patch-figurine'
union all
select id, 1, '/products/pumpkin-2.jpg', 'Pumpkin Patch Figurine on a mossy wood slice' from product where slug = 'pumpkin-patch-figurine'
union all
select id, 2, '/products/pumpkin-3.jpg', 'Pumpkin Patch Figurine with a tiny broom and book' from product where slug = 'pumpkin-patch-figurine'
union all
select id, 3, '/products/pumpkin-4.jpg', 'Pumpkin Patch Figurine side view' from product where slug = 'pumpkin-patch-figurine'
union all
select id, 0, '/products/ghost-1.jpg', 'Friendly Ghost Figurine' from product where slug = 'friendly-ghost-figurine'
union all
select id, 0, '/products/moon-cat.jpg', 'Moon Cat sleeping against a crescent moon' from product where slug = 'spooky-friends'
union all
select id, 0, '/products/collection.jpg', 'Autumn Collection scene' from product where slug = 'autumn-collection';