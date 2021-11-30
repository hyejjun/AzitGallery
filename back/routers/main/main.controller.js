const { Sequelize, sequelize, Auction, Item } = require('../../models/index')
const express = require('express')
const app = express()
const http = require('http')
const socket = require('socket.io')

const server = http.createServer(app)
const io = socket(server)

let insert = (req, res) => {
    // 경매 가격 설정 후 사용자들이 가격을 입력하는 페이지
    res.render('insert.html')
}

let insert_data = async (req, res) => {
    // 입력한 경매 정보를 DB에 입력
    const {price, time, ifExtended} = req.body
    let result = await Item.create({price, dueDate:time, ifExtended})
    res.send({success: true})
}

let main = (req, res) => {
    // 경매 정보 입력 페이지
    res.render('index.html')
}

let main_data = async (req, res) => {
    let {productId} = req.body
    let bid_list = await Auction.findAll({
        where:{
            productId
        }
    })

    let get_price = await Item.findOne({
        where:{
            id: productId
        }
    })
    res.send([bid_list,get_price.dataValues.price])
}

let auction = async (req, res) => {
    // 유저가 입찰을 하면 작업하는 페이지
    const {name, price, productId} = req.body
    console.log(req.body)
    // 테스트 버전에서 상품 ID는 1번으로만 진행되나, 실제로는 상품별로 ID값을 다르게 주어야 함
    let auction_result = await Auction.findAll({
        where:{
            productId
        }
    })
    let items_result = await Item.findOne({
        where:{
            id: productId
        }
    })
    let due_time = items_result.dataValues.dueDate.toTimeString()
    let last_price
    auction_result.length == 0 
    ? last_price = items_result.dataValues.price 
    : last_price = auction_result[auction_result.length-1].dataValues.price
    // 최종가 입력이 안되어있는 경우 items에 입력된 기본 가격으로 설정
    // 입력된 가격이 있으면 가장 마지막에 등록된 가격을 가져온다(낮은 가격으로는 입찰이 안되기 때문)

    function time_calc(time){
        let now = new Date().toTimeString()
        // let test = await sequelize.query('SELECT NOW();')
        // console.log(test[0][0],'시퀄라이즈')
        console.log(now, '현재')
        console.log(time, '입력된시간')
        console.log(now<time)
        return (now<time) // 입력된 시간이 현재 시간보다 미래인가?
        // 반환값이 true면 종료되지 않은 경매, false면 종료된 경매
    }
    console.log(time_calc(due_time))
    if(time_calc(due_time) === true){
        // 진행중인 경매라면
        if(price>last_price){
            // 최초 입찰 발생 시 해당 상품 id의 마감시간을 5분 연장시킨다
            if(auction_result.length == 0 && items_result.dataValues.ifExtended == 1){
                await sequelize.query(`UPDATE items SET 
                dueDate = items.dueDate + INTERVAL 5 SECOND 
                WHERE id=${items_result.dataValues.id}; 
                `) 
            }
            // 입력된 가격이 현재 입찰가보다 높다면
            await Auction.create({
                name,
                price,
                productId
            })
            // Auction DB에 입찰 정보 입력
            // -> items_result.dataValues.id 대신 productId를 써도 되긴 한데...
            res.send({success: true})
            // 프론트 쪽에 성공임을 알림
        } else{
            res.send({success: false, reason: 'price'})
            // 입력 가격이 현재 입찰가보다 낮음
        }
    } else{
        console.log('경매 종료')
        res.send({success: false, reason: 'expired'})
    }
}

// 새로운 주문 들어오면.
let sendNoti = (req, res) => {
    res.json({message:'unread'})
}
module.exports = {
    insert, 
    insert_data, 
    main, 
    main_data, 
    auction, 
    sendNoti
}
