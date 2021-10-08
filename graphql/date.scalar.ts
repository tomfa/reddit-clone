import { GraphQLScalarType, Kind } from "graphql";

type FireStoreDate = { _seconds: number; _nanoseconds: number };
export const parseValue = (value: number | FireStoreDate): Date => {
  if (typeof value === "number") {
    return new Date(value * 1000);
  }
  return new Date(value._seconds * 1000);
};
export const serialize = (value: Date | FireStoreDate): number => {
  if (!(value instanceof Date)) {
    return value._seconds;
  }
  return Math.floor(value.getTime() / 1000);
};

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
