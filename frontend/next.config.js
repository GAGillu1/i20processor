/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_PATH: "http://127.0.0.1:8081",

    LOGIN: "/login",
    I20_PRE_PROCESSOR: "/i20preprocessor",
    I20_POST_PROCESSOR: "/i20process",
    DSO: "/dso",
    USERS: "/users",
    FORGOT: "/forgot",
    CHANGE_PWD: "/changePwd",
    INSTANCE: "/instance",
    ADD_SIGN: "/addSign",
    LOGS: "/log",
  },

};

module.exports = nextConfig
