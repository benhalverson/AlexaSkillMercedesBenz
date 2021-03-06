/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  default-case */
// import * as getData from './api';
import fetch from 'node-fetch';
/**
 * A function that takes the text from the user and responses to the user.
 * @param {object} speech
 * @param {object} shouldEndSession
 */
function generateSpeechResponse(speech, shouldEndSession) {
  return {
    outputSpeech: {
      type: 'PlainText',
      text: speech,
    },
    shouldEndSession,
  };
}


function generateFinalOutput(response, sessionAttributes) {
  return {
    version: '1.0',
    sessionAttributes,
    response,
  };
}

function processLaunchRequest(event, res) {
  // const greeting = 'Hello. You can say Help me find pricing or get traffic information';
  const greeting = 'Hello from the api data ';
  const response = generateSpeechResponse(greeting, false);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
}

/**
 * event is an object that has amazon data
 * res is the response object from any api's
 * @param {object} event
 * @param {object} res
 */
function processGetTraffic(event, res) {
  if (event.request.dialogState === 'STARTED' || event.request.dialogState === 'IN_PROGRESS') {
    const response = {
      outputSpeech: null,
      card: null,
      directives: [{
        type: 'Dialog.Delegate',
      }],
      reprompt: null,
      shouldEndSession: false,
    };
    const sessionAttributes = {};
    const output = generateFinalOutput(response, sessionAttributes);
    res.send(output);
  } else if (event.request.dialogState === 'COMPLETED') {
    const fromCity = event.request.intent.slots.fromCity.value;
    const toCity = event.request.intent.slots.toCity.value;
    const pricing = event.request.intent.slots.pricing.value;

    const speech = `testing ${fromCity}, ${toCity}, ${pricing}`;
    const sessionAttributes = {};
    const response = generateSpeechResponse(speech, true);
    const output = generateFinalOutput(response, sessionAttributes);
    res.send(output);
  }
}


fetch('https://api.mercedes-benz.com/configurator/v1/markets/de_DE/models?bodyId=16&apikey=768e43c0-132a-489f-af85-dde91ba09822')
  .then(res => res.json())
  .then((data) => {
    console.log(data[0].vehicleClass);
  })
  .catch(err => console.error(err));


/**
 * Required for Amazon echo to stop alexa from speaking
 * @param {object} res
 */
function processStopIntent(res) {
  const speechText = 'Goodbye';
  const response = generateSpeechResponse(speechText, true);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
}

/**
 * Required for Amazon echo to help the user on what the skill can do
 * @param {object} res
 */
function processHelpIntent(res) {
  const speechText = 'Hello.. you can say things like. How much is an AMG';
  const response = generateSpeechResponse(speechText, false);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
}

function sessionEndRequest(event, res) {
  const speechText = 'Thanks for trying out the Mercedes skill';
  const response = generateSpeechResponse(speechText, true);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
}


function processGetParts(event, res) {
  console.log(event);
  console.log(res);
}

function intentRequest(event, res) {
  switch (event.request.intent.name) {
    case 'AMAZON.FallbackIntent':
      break;
    case 'AMAZON.CancelIntent':
      break;
    case 'AMAZON.HelpIntent':
      processHelpIntent(res);
      break;
    case 'AMAZON.StopIntent':
      processStopIntent(res);
      break;
    case 'parts':
      processGetParts(event, res);
      break;
    case 'getTraffic':
      processGetTraffic(event, res);
      break;
  }
}
module.exports = function processLaunch(req, res) {
  const event = req.body;

  switch (event.request.type) {
    case 'LaunchRequest':
      processLaunchRequest(event, res);
      break;
    case 'IntentRequest':
      intentRequest(event, res);
      break;
    case 'SessionEndRequest':
      sessionEndRequest(event, res);
      break;
  }
};
