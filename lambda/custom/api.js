import http from 'http';

export default httpGet(myData, callback ) {
  let options = {
    host: 'https://api.mercedes-benz.com',
    path: `/configurator/v1/markets/de_DE/models?bodyId=16&apikey=768e43c0-132a-489f-af85-dde91ba09822`,
    method: 'GET',

  };

  let req = https.request(options, (res) => {
    res.setEncoding('utf8');
    let returnData = '';

    res.on('data', (chunk) => {
      returnData += chunk;
    });

    res.on('end', () => {

      let pop = JSON.parse(returnData).population;

      callback(pop); 
    });
  });
  req.end();
};
