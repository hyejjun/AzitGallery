const { User, Orders, OrderDetail, ShipInfo, ItemInfo, LikeList } = require('../../models');
const { findOne } = require('../../models/auction_history');

/* user 별로 좋아요 한 상품 INSERT */
let like_insert = async (req, res) => {
    console.log(req.body);
    const { view, userIdx, like } = req.body

    if (view !== undefined) {
        let result = await ItemInfo.findOne({
            where: { item_id: view }
        })
        const { item_id, item_code } = result.dataValues

        let data = {}

        switch (like) {
            case true:
                try {
                    await LikeList.create({
                        user_idx: userIdx,
                        item_code
                    })

                    data = {
                        msg: "좋아요 등록 Success",
                        like_status: true,
                        item_id: view,
                        // like_bool
                    }
                } catch (error) {
                    console.log(error)
                    data = {
                        msg: "좋아요 등록 Error"
                    }
                }
                break;

            case false:
                try {
                    let result2 = await LikeList.destroy({
                        where: {
                            user_idx: userIdx,
                            item_code
                        }
                    })
                    let result3 = await LikeList.findAll({
                        where: { user_idx: userIdx, }
                    })
                    console.log(result3);

                    data = {
                        msg: "좋아요 취소 Success",
                        like_status: false,
                        item_id: view
                    }
                } catch (error) {
                    console.log(error);
                    data = {
                        msg: "좋아요 취소 Error"
                    }
                }

                break;
            default:
                break;
        }

        res.json(data)
    }
}

let like_list = async (req, res) => {
    let key = Object.keys(req.body)
    let userIdx = JSON.parse(key)

    try {
        let result = await LikeList.findAll({
            where: { user_idx: userIdx, }
        })

        let list_arr = []
        result.forEach((v, k) => {
            list_arr.push(v.dataValues.item_code)
        })

        let result_arr = []
        let result2 = {}
        for (let i = 0; i < list_arr.length; i++) {
            result2 = await ItemInfo.findOne({ where: { item_code: list_arr[i] } })
            result_arr.push(result2.dataValues.item_id)
        }

        console.log(result_arr);

        data = {
            msg: "OK",
            result_arr
        }
    } catch (error) {
        data = {
            msg: "Fail"
        }
    }

    res.json(data)
}

module.exports = {
    like_insert,
    like_list
}