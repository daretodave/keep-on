export const SETTINGS = require("../../../default.json");
export const get = jest.fn((key, fallback) => SETTINGS[key] || fallback);
export const configuration = jest.fn((map) => map);