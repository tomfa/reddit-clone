import { GraphQLScalarType, Kind } from "graphql";

export const parseValue = (value: number): Date => new Date(value);
export const serialize = (value: Date): number => value.getTime();

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize,
  parseValue,
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});
