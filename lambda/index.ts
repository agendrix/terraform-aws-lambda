import { APIGatewayEvent, APIGatewayProxyStructuredResultV2, Handler } from "aws-lambda";
import AWS from "aws-sdk";

const handler: Handler<APIGatewayEvent, APIGatewayProxyStructuredResultV2> = async (event, context) => {
  const s3 = new AWS.S3();

  const data = {
    text: "Hello World",
    event,
    context,
    listBuckets: await s3.listBuckets().promise(),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
    headers: { "Content-Type": "text/html; charset=utf-8" },
    isBase64Encoded: false,
  };
};

exports.handler = handler;

export const __test__ = {
  handler,
};
