// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: false,
  output: "standalone",
  publicRuntimeConfig: {
    NEXT_PUBLIC_PORT: process.env.NEXT_PUBLIC_PORT,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WORKSPACE_ID: process.env.NEXT_PUBLIC_WORKSPACE_ID,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
    NEXT_PUBLIC_CUSTOMER_DATASTORE_ID: process.env.NEXT_PUBLIC_CUSTOMER_DATASTORE_ID,
    NEXT_PUBLIC_INQUIRY_DATASTORE_ID: process.env.NEXT_PUBLIC_INQUIRY_DATASTORE_ID,
    NEXT_PUBLIC_COMMENT_DATASTORE_ID: process.env.NEXT_PUBLIC_COMMENT_DATASTORE_ID,
  },
};

module.exports = nextConfig;
