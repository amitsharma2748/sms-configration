const mqtt = require('mqtt');
const {
  MQTT,
  MQTT_PASSWORD,
  MQTT_USER,
} = require('../Configurations/readconfigparams');
let mqttClient;

const connect = async (MQTT_CLIENT_ID) => {
  mqttClient = mqtt.connect(MQTT, {
    clientId: MQTT_CLIENT_ID,
    password: MQTT_PASSWORD,
    username: MQTT_USER,
    reconnectPeriod: 1 * 1000,
    protocolVersion: 4,
  });

  mqttClient.on('connect', (mClient) => {
    // console.log('Mqtt Client Connected');
  });
  mqttClient.on('error', (error) => console.log(`Mqtt Client ${error}`));
  return mqttClient;
};

module.exports = connect;
