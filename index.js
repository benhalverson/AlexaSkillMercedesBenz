import request from 'request';
// import qs from 'querystring';
import express from 'express';
import bodyParser from 'body-parser';
import log from 'morgan';
import fetch from 'node-fetch';
// import OAuth2Server from 'express-oauth-server';
// import mongoose from 'mongoose';
import config from './config';
// import model from './oauthModel';

// const mongouri = config.databaseinfo.mongodbUri;
const app = express();
// mongoose.connect(config.databaseinfo.mongodbUri, (err, res) => {
//   if (err) {
//     console.error(`Error connecting to database ${mongouri}, ${err}`);
//   } else {
//     console.log(`Database connection successful, ${mongouri}`);
//   }
// });

// app.use(log('dev'));
// const oauth = new OAuth2Server({
//   model,
// });

app.use(log('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(app.oauth.authorize());

function encodeURL(str) {
  return '';
}
app.get('/config', (req, res) => {
  fetch(config.oauthURL)
    .then(res => res.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('response', response.body);
  // });
});

app.get('/pricing', (req, res) => {
  fetch('https://api.mercedes-benz.com/configurator/v1/markets/de_DE/models?bodyId=16&apikey=768e43c0-132a-489f-af85-dde91ba09822')
    .then(res => res.json())
    .then((response) => {
      console.log(response[0]);
      console.log(response[0].vehicleClass);
      res.send('ok');
    })
    .catch(err => console.error(err));
});

app.get('/dealers', (req, res) => {
  fetch('https://api.mercedes-benz.com/dealer/v1/dealers?radiusValue=10&radiusUnit=KM&apikey=79fed71e-ea81-4cd3-884e-96254df2e5ba')
    .then(res => res.json())
    .then((response) => {
      // console.log(response);
      const data = response;
      console.log(data[0].dealerName);
    });
});

app.listen(config.port, () => {
  console.log(`listing on, ${config.serverUrl}`);
});
