import { JSONSchemaType } from "ajv";
import { ajv } from "./ajv";

export interface PingInputType {
  withTimestamp?: boolean | undefined | null;
}

const schema: JSONSchemaType<PingInputType> = {
  type: "object",
  properties: {
    withTimestamp: { type: "boolean", nullable: true },
  },
  additionalProperties: false,
};

export const validate = ajv.compile(schema);
