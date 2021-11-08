# category에 값 넣기
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,1),'상의');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,2),'하의');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,3),'잡화');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,4),'신발');

# sub_category에 값 넣기
INSERT INTO sub_category (main_category_idx,item_code,sub_category_code,sub_category_name) 
VALUES(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,1),01,'티셔츠');
INSERT INTO sub_category (main_category_idx,item_code,sub_category_code,sub_category_name) 
VALUES(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,2),02,'블라우스');
INSERT INTO sub_category (main_category_idx,item_code,sub_category_code,sub_category_name) 
VALUES(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,3),03,'셔츠');
INSERT INTO sub_category (main_category_idx,item_code,sub_category_code,sub_category_name) 
VALUES(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,4),04,'니트');


# user에 값 넣기
INSERT INTO user(nick_name,kaikas_address,contact,address,email)
VALUES('mihee','address1',0100000000,'homeaddress1','email@naver.com');
INSERT INTO user(nick_name,kaikas_address,contact,address,email)
VALUES('mihee2','address2',0200000000,'homeaddress2','email2@naver.com');
INSERT INTO user(nick_name,kaikas_address,contact,address,email)
VALUES('mihee3','address3',0300000000,'homeaddress3','email3@naver.com');
INSERT INTO user(nick_name,kaikas_address,contact,address,email)
VALUES('mihee4','address4',0400000000,'homeaddress4','email4@naver.com');



## item_info랑direct_deal 한번에 값 넣기
begin; 
insert INTO item_info(creator,item_code,description,title,sell_type,category_id)
VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),101),'편안하게 입으세요3','여성 티셔츠3',0,1);
# insert into item_detail select * from (select (select max(a.nft_idx)+1 from item_detail as a),(select max(a.item_id) from item_info as a),if((select a.item_detail_idx from item_detail as a),(select max(a.item_detail_idx)+1 from item_detail as a),1),'L','black','nfttt',5,CONCAT(UNIX_TIMESTAMP(NOW()),101),0 ) as item_detail;
# insert into item_detail select * from (select (select last_insert_id(),(select max(a.item_id) from item_info as a),if((select a.item_detail_idx from item_detail as a),(select max(a.item_detail_idx)+1 from item_detail as a),1),'L','black','nfttt',5,CONCAT(UNIX_TIMESTAMP(NOW()),101),0 ) as item_detail;
insert into direct_deal(direct_deal_idx,price,currency) 
values((select max(a.item_id) from item_info as a),3000,3000);
commit;

## item_detail은 size랑 color 때문에 아예 따로 넣어야 할 듯...

## item_info랑 item_detail이랑 auction이랑 auction_history에 같이 값 넣기
begin;
insert INTO item_info(creator,item_code,description,title,sell_type,category_id) VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),101),'편안하게 입으세요3','여성 티셔츠3',0,1);
# insert into item_detail select * from (select (select max(a.nft_idx)+1 from item_detail as a),(select max(a.item_id) from item_info as a),(select max(a.item_detail_idx)+1 from item_detail as a),'L','black','nftt',5,CONCAT(UNIX_TIMESTAMP(NOW()),101),0 ) as item_detail;
insert into auction(auction_idx,end_date,if_extended) values((select max(a.item_id) from item_info as a),'2021-11-20',1);
insert into auction_history (auc_history_idx,bidder,bid_price,currency) values((select max(a.auction_idx) from auction as a),'1',3000,3000);
commit;













insert into like_list(user_idx,item_code) values(1,1636249782102);
// 좋아요 목록의 item_code는 전체 제품에서 대한 item_code로
insert into like_list(user_idx,item_code) values(3,1636249782102);
insert into like_list(user_idx,item_code) values(4,1636249782102); 

insert INTO item_info(creator,item_code,description,title,sell_type,category_id) VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),101),'편안하게 입으세요','여성 티셔츠',0,1);
insert INTO item_info(creator,item_code,description,title,sell_type,category_id) VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),102),'즐겁게 입으세요','여성 블라우스',1,1);

insert into item_detail values(0,1,1,'s','black','asdfasdfs',5,163624978010101,false);
insert into item_detail values(0,1,2,'m','black','asdfasdfm',5,163624978010102,false);
insert into item_detail values(0,2,1,'s','black','asdfasdf',5,163624978210201,false);
insert into item_detail values(0,2,2,'m','black','asdfasdf',5,163624978210202,false);


## item_info랑 direct_deal에 같이 값 넣는 쿼리
begin; 
insert INTO item_info(creator,item_code,description,title,sell_type,category_id) VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),101),'편안하게 입으세요3','여성 티셔츠3',0,1);
insert into direct_deal(direct_deal_idx,price,currency) values((select max(a.item_id) from item_info as a),3000,3000);
commit;



/*
begin; insert INTO item_info(creator,item_code,description,title,sell_type,category_id) VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),101),'편안하게 입으세요3','여성 티셔츠3',0,1);insert into direct_deal(direct_deal_idx,price,currency) values((select max(a.item_id) from item_info as a),3000,3000);insert into item_detail (item_info_idx,item_detail_idx,size,color,nft,qty,item_code,product_status) values((select max(b.item_id) from item_info as b),
*/

select max(b.item_id) from item_info as b;

