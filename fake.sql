# category에 값 넣기
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,1),'상의');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,2),'하의');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,3),'악세사리');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,4),'신발');
INSERT INTO sub_category (main_category_idx,item_code,sub_category_code,sub_category_name) 
VALUES
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,1),01,'티셔츠'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,2),02,'블라우스'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,3),03,'셔츠'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,4),04,'니트');

# user에 값 넣기
INSERT INTO user(nick_name,kaikas_address,contact,address,email)
VALUES
('mihee','address1',0100000000,'homeaddress1','email@naver.com'),
('mihee2','address2',0200000000,'homeaddress2','email2@naver.com'),
('mihee3','address3',0300000000,'homeaddress3','email3@naver.com'),
('mihee4','address4',0400000000,'homeaddress4','email4@naver.com');



## item_info랑direct_deal 한번에 값 넣기
begin; 
insert INTO item_info(creator,item_code,description,title,sell_type,category_id)
VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),101),'편안하게 입으세요3','여성 티셔츠3',0,1);
# insert into item_detail select * from (select (select max(a.nft_idx)+1 from item_detail as a),(select max(a.item_id) from item_info as a),if((select a.item_detail_idx from item_detail as a),(select max(a.item_detail_idx)+1 from item_detail as a),1),'L','black','nfttt',5,CONCAT(UNIX_TIMESTAMP(NOW()),101),0 ) as item_detail;
# insert into item_detail select * from (select (select last_insert_id(),(select max(a.item_id) from item_info as a),if((select a.item_detail_idx from item_detail as a),(select max(a.item_detail_idx)+1 from item_detail as a),1),'L','black','nfttt',5,CONCAT(UNIX_TIMESTAMP(NOW()),101),0 ) as item_detail;
//밑에 item_detail 값 넣기 진짜...!
    insert into item_detail select * from (select (select max(a.nft_idx)+1 from item_detail as a),(select max(a.item_id) from item_info as a),if((select max(a.item_detail_idx) from item_detail as a),(select max(a.item_detail_idx)+1 from item_detail as a),1),'m','black','nftfasfddftt',5,CONCAT(1636359080,10103),0 ) as item_detail;
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


# 특정 유저가 구매한 제품
// 최근발행순  
select b.item_code,d.registered_at 
from orders as a 
join order_detail 
as b on a.order_num=b.order_num 
join item_detail as c 
on b.item_code=c.item_code 
join item_info as d 
on d.item_id=
(select distinct item_info_idx 
from item_detail 
where left(item_code,13)=1636335206101) 
where a.buyer=2 
order by registered_at;

select b.item_code,d.registered_at from orders as a join order_detail as b on a.order_num=b.order_num join item_detail as c on b.item_code=c.item_code join item_info as d on d.item_id=(select distinct item_info_idx from item_detail where left(item_code,13)=1636335206101) where a.buyer=2 order by registered_at;



select b.item_code 
from orders as a 
join order_detail as b 
on a.order_num = b.order_num 
join item_detail as c 
on b.item_code=c.item_code 
where a.buyer=2;
// 좋아요 순

# 내가 발행한 제품 중 판매된 제품 
select a.item_code, d.item_delivery_state, d.post_num, d.delivery_company 
from item_detail as a 
join item_info as b 
join order_detail as c 
on a.item_code=c.item_code 
join ship_info as d 
on c.order_detail_num=d.order_detail_num 
where a.product_status=1 and b.creator=1;

# 내가 발행한 제품 중 미판매된 제품
 select b.item_code 
 from item_info as a 
 join item_detail as b 
 on a.item_id=b.item_info_idx 
 where a.creator=1 and b.product_status=0;














insert into like_list(user_idx,item_code) values(1,1636249782102);
// 좋아요 목록의 item_code는 전체 제품에서 대한 item_code로
insert into like_list(user_idx,item_code) values(3,1636249782102);
insert into like_list(user_idx,item_code) values(4,1636249782102); 

insert INTO item_info(creator,item_code,description,title,sell_type,category_id) 
VALUES(1,CONCAT(UNIX_TIMESTAMP(NOW()),101),'편안하게 입으세요','여성 티셔츠',0,1);
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


















INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,1),'여성복');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,2),'남성복');
INSERT INTO category(main_category_code,category_name) VALUES(CONCAT(0,3),'아동복');


INSERT INTO sub_category (main_category_idx,item_code,sub_category_code,sub_category_name) 
VALUES(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,1),01,'티셔츠'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,2),02,'블라우스'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,3),03,'셔츠'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=1),0,4),04,'니트'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=2),0,1),01,'티셔츠'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=2),0,2),02,'블라우스'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=2),0,3),03,'셔츠'),
(1,CONCAT((SELECT main_category_code FROM category WHERE category.id=2),0,4),04,'니트');

INSERT INTO user(nick_name,kaikas_address,contact,address,email)
VALUES('mihsee','0x2618f9b36086912b479ba6a6fff6abcfcc032398',01000000100,'homeaddrsess1','email@navesr.com'),
('mihee2','address2',0200000000,'homeaddress2','email2@naver.com'),
('mihee3','address3',0300000000,'homeaddress3','email3@naver.com'),
('mihee4','address4',0400000000,'homeaddress4','email4@naver.com'),
('mihee5','address5',0100000000,'homeaddres5','email5@naver.com'),
('mihee6','address6',0200000000,'homeaddress6','email6@naver.com'),
('mihee7','address7',0300000000,'homeaddress7','email7@naver.com'),
('mihee8','address8',0400000000,'homeaddress8','email8@naver.com'),
('mihee9','address9',0100000000,'homeaddress9','email9@naver.com'),
('mihee10','address10',0100000000,'homeaddress10','email10@naver.com'),
('mihee11','address11',0100000000,'homeaddress11','email11@naver.com'),
('mihee12','address12',0100000000,'homeaddress12','email12@naver.com'),
('mihee13','address13',0100000000,'homeaddress13','email13@naver.com'),
('mihee14','address14',0100000000,'homeaddress14','email14@naver.com'),
('mihee15','address15',0100000000,'homeaddress15','email15@naver.com');



begin;
insert INTO item_info(creator,item_code,description,title,sell_type,size,color,product_status,category_id)
VALUES(2,(concat(UNIX_TIMESTAMP(NOW()),101)),'편안하게 입으세요3','여성 티셔츠3',0,'S/M/L','black/white/red','판매중',1);

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'S','black','3nsadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,1),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'M','black','3nsadaasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,2),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'L','black','3nssadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,3),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'S','white','3snsadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,4),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'M','white','3nszvadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,5),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'L','white','3qnsadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,6),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'S','red','3wnsadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,7),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'M','red','3ensadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,8),0 ) as item_detail;

insert into item_detail
select * from
(select (select max(a.nft_idx)+1 from item_detail as a),
(select max(a.item_id) from item_info as a),
'L','red','3rnsadasdfat1',CONCAT((select a.item_code from item_info as a where a.item_id=(select max(item_id) from item_info)),0,9),0 ) as item_detail;

insert into direct_deal(direct_deal_idx,price,currency) 
values((select max(a.item_id) from item_info as a),3000,3000);
commit;

// order_detail에 값넣기
insert into order_detail(size,color,shipper_idx,item_code,price,item_id) 
values('S','black','3',163656849410109,3000,4);