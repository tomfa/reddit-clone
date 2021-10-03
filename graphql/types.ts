import {Mutation, Query} from "./generated/types";

export type QueryType = keyof Query;
export type MutationType = keyof Mutation;
