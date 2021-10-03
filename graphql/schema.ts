import schemaNode from "./schema.graphql";
import { buildASTSchema } from "graphql";
export const typeDefs = schemaNode;
export const schema = buildASTSchema(schemaNode);
