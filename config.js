var config = {
  environment: process.env.NODE_ENV,
  mongoDbUri: process.env.MONGODB_URI,
  port: parseInt(process.env.HTTP_PORT),
};

module.exports = config;