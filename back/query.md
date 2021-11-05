insert into user(nick_name,kaikas_address,contact,address,email) values('algml','asdf','1234','asdf','asdf@naver.com');

insert into item(creator,item_code) values(1,'0102');



select SUBSTRING(item_code,1,2) from item;








insert INTO category(main_category_code,category_name) VALUES(1,'상의');
insert INTO category(main_category_code,category_name) VALUES(2,'하의');
insert INTO category(main_category_code,category_name) VALUES(3,'잡화');
insert INTO category(main_category_code,category_name) VALUES(4,'신발');
INSERT INTO sub_category(main_category_idx,item_code,sub_category_code,sub_category_name) VALUES(1,'0101','01','티셔츠');
INSERT INTO sub_category(main_category_idx,item_code,sub_category_code,sub_category_name) VALUES(1,'0102','02','블라우스');
INSERT INTO sub_category(main_category_idx,item_code,sub_category_code,sub_category_name) VALUES(1,'0103','03','아우터');
INSERT INTO sub_category(main_category_idx,item_code,sub_category_code,sub_category_name) VALUES(1,'0104','04','긴팔');

insert into user(nick_name,kaikas_address,contact,address,email) values('algml','asdf','1234','asdf','asdf@naver.com');
insert into user(nick_name,kaikas_address,contact,address,email) values('algml2','asdf2','12342','asdf2','asdf2@naver.com');

insert into item(creator,item_code) values(1,0102);
insert into item(creator,item_code) values(1,0103);