import { createReqTypes } from "./request";

// AUTH
export const GET_USER = createReqTypes("GET_USER");
export const REGISTER_USER = createReqTypes("REGISTER_USER");

export const CLEAR_USER = createReqTypes("CLEAR_USER");
// actions
export * from "./auth/actions";
