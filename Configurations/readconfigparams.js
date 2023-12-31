// @CP This Js is used to Read the Configuration parameters for the application.
// This js all the Paramaeters / Variables which will be used by the application globally.

const fs = require('fs');
const xml2js = require('xml2js');
var parser = new xml2js.Parser();

const res = {};

// @CP All Configuration parametres are Read from the XML file and Set in the Application.
const temp = fs.readFileSync(__dirname + '/configuration.xml', {
  encoding: 'utf8',
});
parser.parseString(temp, (err, result) => {
  if (err) console.log(err);

  // @SQL
  res.MYSQL_HOST =
    result.CONFIGURATIONS.MYSQL_SERVER_DETAILS[0].MYSQL_SERVER_HOST[0];
  res.MYSQL_USER =
    result.CONFIGURATIONS.MYSQL_SERVER_DETAILS[0].MYSQL_SERVER_USER[0];
  res.MYSQL_PORT =
    result.CONFIGURATIONS.MYSQL_SERVER_DETAILS[0].MYSQL_SERVER_PORT[0];
  res.MYSQL_PASSWORD =
    result.CONFIGURATIONS.MYSQL_SERVER_DETAILS[0].MYSQL_SERVER_PASSWORD[0];
  //res.MYSQL_DB = result.CONFIGURATIONS.MYSQL_SERVER_DETAILS[0].MYSQL_SERVER_DATABASE[0];

  // @MQTT
  res.MQTT = result.CONFIGURATIONS.MQTT_SERVER_DETAILS[0].MQTT_SERVER_HOST[0];
  res.MQTT_USER =
    result.CONFIGURATIONS.MQTT_SERVER_DETAILS[0].MQTT_SERVER_USER[0];
  res.MQTT_PASSWORD =
    result.CONFIGURATIONS.MQTT_SERVER_DETAILS[0].MQTT_SERVER_PASSWORD[0];
  res.MQTT_CLIENT_ID =
    result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_CLIENT_ID[0];

  res.MQTT_TEST_CLIENT_ID =
    result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_TEST_CLIENT_ID[0];

  // @MONGO DB
  res.MONGO_HOST =
    result.CONFIGURATIONS.MONGO_SERVER_DETAILS[0].MONGO_SERVER_HOST[0];
  res.MONGO_PORT =
    result.CONFIGURATIONS.MONGO_SERVER_DETAILS[0].MONGO_SERVER_PORT[0];
  res.MONGO_USER =
    result.CONFIGURATIONS.MONGO_SERVER_DETAILS[0].MONGO_SERVER_USER[0];
  res.MONGO_PASSWORD =
    result.CONFIGURATIONS.MONGO_SERVER_DETAILS[0].MONGO_SERVER_PASSWORD[0];
  //res.MONGO_DB = result.CONFIGURATIONS.MONGO_SERVER_DETAILS[0].MONGO_SERVER_DATABASE[0];
  res.MONGO_URI = `mongodb://${res.MONGO_HOST}:${res.MONGO_PORT}/?safe=true`;
  // SMTP
  res.SMTP_SERVER_HOST =
    result.CONFIGURATIONS.SMTP_SERVER_DETAILS[0].SMTP_SERVER_HOST[0];
  res.SMTP_SERVER_PORT =
    result.CONFIGURATIONS.SMTP_SERVER_DETAILS[0].SMTP_SERVER_PORT[0];

  // @OTHERS
  res.APPPORT = result.CONFIGURATIONS.PROJECT_VARIABLES[0].APPPORT[0];
  res.MYSQL_DB =
    result.CONFIGURATIONS.PROJECT_VARIABLES[0].MYSQL_SERVER_DATABASE[0];
  res.MQTT_TOPIC_1 = result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_TOPIC_1[0];
  res.MQTT_TOPIC_2 = result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_TOPIC_2[0];
  res.MQTT_TOPIC_3 = result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_TOPIC_3[0];
  res.MQTT_TOPIC_4 = result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_TOPIC_4[0];
  res.MQTT_TOPIC_5 = result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_TOPIC_5[0];
  res.MQTT_TOPIC_6 = result.CONFIGURATIONS.PROJECT_VARIABLES[0].MQTT_TOPIC_6[0];
  res.SHOULD_SEND_MAIL =
    result.CONFIGURATIONS.PROJECT_VARIABLES[0].SHOULD_SEND_MAIL[0];
});
// console.log(res);
module.exports = res;
