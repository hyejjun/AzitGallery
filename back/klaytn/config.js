require('dotenv').config();

const accessKeyId = process.env.KAS_ACCESS_KEY_ID;
const secretAccessKey = process.env.KAC_SECRET_ACCESS_KEY; 
const authorization = "Basic " + Buffer.from(accessKeyId + ":" + secretAccessKey).toString("base64");
const developerKey =`${process.env.DEVELOPER_KEY}`;

const option = {
  headers: [
    {
      name: "Authorization",
      value: authorization,
    },
    { name: "x-krn", value: "krn:1001:node" },
  ],
};

const Caver = require("caver-js");
const caver = new Caver(
  new Caver.providers.HttpProvider(
    "https://node-api.klaytnapi.com/v1/klaytn",
    option
  )
);

module.exports = {accessKeyId, secretAccessKey, authorization, developerKey,caver}


