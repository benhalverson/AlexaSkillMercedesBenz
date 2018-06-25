const env = process.env;

export const nodeEnv = env.NODE_ENV || 'development';

export const logStars = (message) => {
  console.info('**********');
  console.info(message);
  console.info('**********');
};
export default {
  get oauthURL() {
    return `https://api.secure.mercedes-benz.com/oidc10/auth/oauth/v2/authorize?
    response_type=code&client_id=${this.CLIENT_ID}&redirect_uri=http://ba095b5f.ngrok.io/&scope=${this.SCOPES_FOR_API}`;
  },
  API_URI: env.API_URI || 'https://api.mercedes-benz.com/experimental/connectedvehicle/v1/',
  API_KEY: env.API_KEY || 'FILL ME IN',
  CLIENT_ID: env.CLIENT_ID || 'FILL ME IN',
  CLIENT_SECRET: env.CLIENT_SECRET || 'FILL ME IN',
  REDIRECT_URI: 'http://localhost:3000',
  SCOPES_FOR_API: 'mb:vehilce:status:general',
  VEHICLE_ID: '1234567890ABCD1234',
  databaseinfo: {
    mongodbUri: env.mongodbUri || 'mongodb://localhost:27017/test',
  },
  port: env.PORT || 3000,
  host: env.HOST || 'localhost',
  get serverUrl() {
    return `http://${this.host}:${this.port}`;
  },
};
