module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongodbURI: process.env.MONGO_URI,
  mongodbName: process.env.DB_NAME,
  mongodbPort: process.env.DB_PORT,
  jwtKey: process.env.JWT_KEY
};
