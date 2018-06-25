import mongoose, { Schema } from 'mongoose';

mongoose.model('OAuthTokens', new Schema({
  accessToken: { type: String },
  accessTokenExpiresOn: { type: Date },
  client: { type: Object },
  clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresOn: { type: Date },
}));

mongoose.model('OAuthClients', new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array },
}));

const OAuthTokensModel = mongoose.model('OAuthTokens');
const OAuthClientsModel = mongoose.model('OAuthClients');

/**
 * Get access token
 * @param {string} bearerToken
 */

export function getAccessToken(bearerToken) {
  return OAuthTokensModel.findOne({ accessToken: bearerToken }).lean();
}

/**
 *  Get Client
 * @param {string} clientId
 * @param {string} clientSecret
 */

export function getClient(clientId, clientSecret) {
  return OAuthClientsModel.findOne({ clientId, clientSecret }).lean();
}

/**
 *  Get refresh token
 * @param {string} refreshToken
 */
export function getRefreshToken(refreshToken) {
  return OAuthTokensModel.findOne({ refreshToken }).lean();
}

export function saveToken(token, client) {
  const accessToken = new OAuthTokensModel({
    accessToken: token.accessToken,
    accessTokenExpiresOn: token.accessTokenExpiresOn,
    client,
    clientId: token.clientId,
    refreshToken: token.refreshToken,
    refreshTokenExpiresOn: token.refreshTokenExpiresOn,
  });

  return new Promise((resolve, reject) => {
    accessToken.save((err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  }).then(saveResult => saveResult = saveResult.toJSON())
    .catch(err => console.error(err));
}
