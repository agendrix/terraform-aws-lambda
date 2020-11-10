import assert from "assert";

import "./mocks";

import { __test__ } from "../lambda/index";
import { APIGatewayProxyStructuredResultV2 } from "aws-lambda";
import { S3 } from "aws-sdk";
import { MOCKED_BUCKETS, MOCKED_OWNER } from "./mocks/libs/aws-sdk";

const handler = __test__.handler;

describe("exports.handler", () => {
  const fakeEvent: any = {};
  const fakeContext: any = {};
  const fakeCallback = () => {};

  it("returns 200 with Hello World", async () => {
    const response = (await handler(fakeEvent, fakeContext, fakeCallback)) as APIGatewayProxyStructuredResultV2;

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(JSON.parse(response.body || "").text, "Hello World");
  });

  it("returns a list of S3 buckets", async () => {
    const response = (await handler(fakeEvent, fakeContext, fakeCallback)) as APIGatewayProxyStructuredResultV2;
    const listBucketsOutput: S3.ListBucketsOutput = JSON.parse(response.body || "").listBuckets;

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(listBucketsOutput.Owner?.DisplayName, MOCKED_OWNER);
    assert.deepStrictEqual(
      listBucketsOutput.Buckets?.map(b => b.Name),
      MOCKED_BUCKETS
    );
  });
});
