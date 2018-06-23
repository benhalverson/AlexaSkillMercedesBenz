import request from 'request';
import express from 'express';
import bodyParser from 'body-parser';
import log from 'morgan';

const apiURL = 'https://api.mercedes-benz.com/experimental/connectedvehicle_tryout/v1';

request(apiURL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

