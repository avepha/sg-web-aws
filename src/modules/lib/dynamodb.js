
import AWS from 'aws-sdk';
import Config from '../config';
import { resolve } from 'path';

export const init = async () => {
    AWS.config.update({
        region: Config.awsRegion,
        endpoint: "apigateway.ap-southeast-1.amazonaws.com"
    });
}

export const fetchLogger = async (from, to, mid) => {
    var docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: 'SG_LOG_SENSORS',
        Key: {
            mid: mid,
        },
        KeyConditionExpression: "mid = :mid and #ts between :from and :to",
        ProjectionExpression: "payload, #ts",
        ExpressionAttributeNames: {
            "#ts": "timestamp"
        },
        ExpressionAttributeValues: {
            ":mid": mid,
            ":from": parseInt(from),
            ":to": parseInt(to)
        }
    };
    return new Promise((resolve, reject) => {
        docClient.query(params, (err, data) => {
            if (err) {
                reject(JSON.stringify(err, null, 2))
            } else {
                resolve(data);
            }
        });
    })

}