const aws = require('aws-sdk')
const dotenv = require('dotenv')
const crypto = require('crypto')
const { promisify } = require('util')
const randomBytes = promisify(crypto.randomBytes)
dotenv.config()


const region = 'ap-northeast-2'
const bucketName = 'dfassf-bucket-test'
// const bucketName = 'nft2-s3'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
  })

async function generate_url() {
    const raw_bytes = await randomBytes(16)
    const image_name = raw_bytes.toString('hex')
  
    const params = ({
      Bucket: bucketName,
      Key: image_name,
    })
  
    const upload_url = await s3.getSignedUrlPromise('putObject', params)
    return upload_url
  }
  
  module.exports = {
    generate_url,
  }