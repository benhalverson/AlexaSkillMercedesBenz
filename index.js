// ts-check
import request from 'request';
// import qs from 'querystring';
import express from 'express';
import bodyParser from 'body-parser';
import log from 'morgan';
// import OAuth2Server from 'express-oauth-server';
import mongoose from 'mongoose';
import config from './config';
// import model from './oauthModel';

const mongouri = config.databaseinfo.mongodbUri;
const app = express();
mongoose.connect(config.databaseinfo.mongodbUri, (err, res) => {
  if (err) {
    console.error(`Error connecting to database ${mongouri}, ${err}`);
  } else {
    console.log(`Database connection successful, ${mongouri}`);
  }
});

// app.use(log('dev'));
// const oauth = new OAuth2Server({
//   model,
// });

app.use(log('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(app.oauth.authorize());

app.get('/request', (req, res) => {
  request(config.oauthURL, (error, response) => {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  });
  res.send({ data: 'ok' });
});

// app.get('/req', (req, res) => {

// });


app.listen(config.port, () => {
  console.log(`listing on, ${config.serverUrl}`);
});
