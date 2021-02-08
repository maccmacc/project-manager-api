require('dotenv').config();

const APP_PORT = +process.env.PORT || 3000;
const SERVICE_NAME = process.env.SERVICE_NAME || 'ProjectManagerService';
const {
  DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME, DATABASE_PORT, DATABASE_DIALECT,
} = process.env;

module.exports = {
  APP_PORT,
  SERVICE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USERNAME,
  DATABASE_NAME,
  DATABASE_PORT,
  DATABASE_DIALECT,
};
