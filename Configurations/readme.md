## This file Tells the Developers on how to use the Variables.

All Developeers are requested to follow the Instructions carefully.
Here is the process of 
1. When you create ne Project , Please list all the Variables that you want to use
2. List the DB that you will Interact with
3. List the Custom variables that you need to Initialize.
4. Share the list as below with the IT team
5. IT Team will Set these Project Variables  for Developement and Production
PROJECT_DEVELOPMENT_VARIABLES
PROJECT_PRODUCTION_VARIABLES
6. These Variables will come in the configuration.xml in Configurations folder
7. This XML is generated when the Project gets Deployed.
7. Copy this XML into your folder for Working from pipeline

Sample File for Decplaring Project variabls.


<PROJECT_VARIABLES>
    <APPPORT>4000</APPPORT>
    <COMMENT>Developers can Put the Project Variables here</COMMENT>
    <COMMENT1>All Variables have be be in Uppercase</COMMENT1>
    <MYSQL_DB>DB_NAME</MYSQL_DB>
    <MYSQL_DB1>DB1_NAME</MYSQL_DB1>
    <MQTT_CLIENT_ID>$$CI_PROJECT_TITLE_LOCAL_CLIENT_ID</MQTT_CLIENT_ID>
    <MONGO_COLLECTION>COLECTIONNAME</MONGO_COLLECTION>
    <MONGO_COLLECTION1>COLLECTIONNAME</MONGO_COLLECTION1>
    <REDIS_SERVER_DATABASE>PROJECT_REDIS_DATABASE</REDIS_SERVER_DATABASE>
    <REDIS_SERVER_DATABASE1>PROJECT_REDIS_DATABASE1</REDIS_SERVER_DATABASE1>
    <MQTT_TOPIC_1>PROJECT_REDIS_DATABASE1</MQTT_TOPIC_1>
    <MQTT_TOPIC_2>PROJECT_REDIS_DATABASE2</MQTT_TOPIC_2>
    <MQTT_TOPIC_3>PROJECT_REDIS_DATABASE3</MQTT_TOPIC_3>
    <MQTT_TOPIC_4>PROJECT_REDIS_DATABASE4</MQTT_TOPIC_4>
    <MQTT_TOPIC_5>PROJECT_REDIS_DATABASE5</MQTT_TOPIC_5>
    <MQTT_TOPIC_6>PROJECT_REDIS_DATABASE6</MQTT_TOPIC_6>
</PROJECT_VARIABLES>