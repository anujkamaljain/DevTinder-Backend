const { SESClient } = require("@aws-sdk/client-ses");
const REGION = "ap-south-1";
// In v2 we dont have to pass accesskeyid and secretaccesskey in credentials we have to pass with region with ,
const sesClient = new SESClient({ region: REGION, credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY, 
} });
module.exports = { sesClient };