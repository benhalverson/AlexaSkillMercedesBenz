/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* eslint-disable  default-case */

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
  const greeting = 'Hello. You can say Help me find pricing or get traffic information';
  const response = generateSpeechResponse(greeting, false);
  const sessionAttributes = {};
  const output = generateFinalOutput(response, sessionAttributes);
  res.send(output);
  console.log(output);
}

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

    const speech = `The price is ${pricing} `;
    const sessionAttributes = {};
    const response = generateSpeechResponse(speech, true);
    const output = generateFinalOutput(response, sessionAttributes);
  }
}

function intentRequest(event, res) {
  switch (event.request.intent.name) {
    case 'AMAZON.FallbackIntent':
      break;
    case 'AMAZON.CancelIntent':
      break;
    case 'AMAZON.HelpIntent':
      break;
    case 'AMAZON.StopIntent':
      break;
    case 'parts':
      break;
    case 'getTraffic':
      processGetTraffic(event, res);
      break;
  }
}
export const processLaunch = (req, res) => {
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
