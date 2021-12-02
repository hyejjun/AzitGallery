
/* 서영 */
 insert into user (nick_name, kaikas_address, contact, address, join_date, email) values ('epiteom', '0x7a237f4050ae92ced73576f4585b04c05178bdd3', 01066182614, '주소', now(), 'eptieom@gmail.com');

insert into category (main_category_code, category_name) values (01, '상의');
insert into category (main_category_code, category_name) values (02, '하의');
insert into category (main_category_code, category_name) values (03, '잡화');

insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (01, 101, 1, '스웨터');
insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (01, 102, 2, '티셔츠');
insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (01, 103, 3, '패딩');
insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (01, 104, 4, '아우터');
insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (02, 201, 1, '바지');
insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (02, 202, 2, '치마');
insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (03, 301, 1, '악세서리');
insert into sub_category (main_category_idx, item_code, sub_category_code, sub_category_name) values (03, 302, 2, '신발');
 

insert into auction (auction_idx) value(21);
insert into auction (auction_idx) value(22);
insert into auction (auction_idx) value(23);
insert into auction (auction_idx) value(24);
insert into auction (auction_idx) value(25);
insert into auction (auction_idx) value(26); 

insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 1, CONCAT(UNIX_TIMESTAMP(NOW()),101), '기능성 스웨터1', '기능성 스웨터1', now(), false, 5, 01);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 2, CONCAT(UNIX_TIMESTAMP(NOW()),102), '기능성 스웨터2', '기능성 스웨터2', now(), false, 5, 01);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 3, CONCAT(UNIX_TIMESTAMP(NOW()),103), '기능성 스웨터3', '기능성 스웨터3', now(), false, 5, 01);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 4, CONCAT(UNIX_TIMESTAMP(NOW()),104), '기능성 스웨터4', '기능성 스웨터4', now(), false, 5, 01);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 5, CONCAT(UNIX_TIMESTAMP(NOW()),201), '기능성 스웨터5', '기능성 스웨터5', now(), false, 5, 02);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 6, CONCAT(UNIX_TIMESTAMP(NOW()),202), '기능성 스웨터6', '기능성 스웨터6', now(), false, 5, 02);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 7, CONCAT(UNIX_TIMESTAMP(NOW()),301), '기능성 스웨터7', '기능성 스웨터7', now(), false, 5, 03);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 8, CONCAT(UNIX_TIMESTAMP(NOW()),302), '기능성 스웨터8', '기능성 스웨터8', now(), false, 5, 03);

insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 21, CONCAT(UNIX_TIMESTAMP(NOW()),101), '기능성 스웨터21', '기능성 스웨터21', now(), true, 5, 01);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 22, CONCAT(UNIX_TIMESTAMP(NOW()),102), '기능성 스웨터22', '기능성 스웨터22', now(), true, 5, 01);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 23, CONCAT(UNIX_TIMESTAMP(NOW()),201), '기능성 스웨터23', '기능성 스웨터23', now(), true, 5, 02);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 25, CONCAT(UNIX_TIMESTAMP(NOW()),202), '기능성 스웨터25', '기능성 스웨터25', now(), true, 5, 02);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 24, CONCAT(UNIX_TIMESTAMP(NOW()),301), '기능성 스웨터24', '기능성 스웨터24', now(), true, 5, 03);
insert into item_info (creator, item_id, item_code, description, title, registered_at, sell_type, item_hits, category_id) values (1, 26, CONCAT(UNIX_TIMESTAMP(NOW()),302), '기능성 스웨터26', '기능성 스웨터26', now(), true, 5, 03);

/* 다른 분 */
insert into category (main_category_code, category_name) values (04, 'dds');

insert into item (creator, item_id, item_code) values (1, 4,'item_code');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (4, '기능성 옷4', 'tmd 스웨터', now(), true);



insert into category (main_category_code, category_name) values (05, 'dds');

insert into item (creator, item_id, item_code) values (1, 5,'item_code');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (5, '기능성 옷5', 'tmd 스웨터', now(), true);


insert into category (main_category_code, category_name) values (06, 'dds');

insert into item (creator, item_id, item_code) values (1, 6,'item_code');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (6, '기능성 옷6', 'tmd 스웨터', now(), true);


insert into category (main_category_code, category_name) values (07, 'dds');

insert into item (creator, item_id, item_code) values (1, 7,'item_code');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (7, '기능성 옷7', 'tmd 스웨터', now(), true);


insert into category (main_category_code, category_name) values (08, 'dds');

insert into item (creator, item_id, item_code) values (1, 8,'item_code');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (8, '기능성 옷8', 'tmd 스웨터', now(), true);



insert into category (main_category_code, category_name) values (09, 'dds');

insert into item (creator, item_id, item_code) values (1, 9,'item_code');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (9, '기능성 옷9', 'tmd 스웨터', now(), true);


insert into category (main_category_code, category_name) values (10, 'dds');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (10, '기능성 옷10', 'tmd 스웨터', now(), true);


insert into category (main_category_code, category_name) values (11, 'dds');

insert into item (creator, item_id, item_code) values (1, 11,'item_code');

insert into item_info (item_info_idx, description, title, registered_at, sell_type) values (11, '기능성 옷11', 'tmd 스웨터', now(), true);

inset user(user_idx,nick_name,kaikas_address,contact,address,join_date,email) values (10,"hi","ddddd","wwwww","ddd","asddw");

