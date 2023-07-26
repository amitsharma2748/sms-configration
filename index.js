// server.js
const express = require("express");
const pool = require("./db");
var cors = require("cors");
const {
  filterConfigurationByPoid,
  getUniqueConfigurationsPoid,
  getUniqueConfigurationsCategory,
  updateConfigurationsAllCategory,
  updateConfigurationsAllDisplayKeyName,
  updateConfigurationsAllHelptext,
  updateConfigurationByConfig,
  updateConfigurationsAllValue,
  filterDataByPoid,
  updateConfigurationTemplate,
} = require("./controllers");
const app = express();
const port = 4000; // You can change this port number if needed
//cors
app.use(cors());
// Route to handle GET requests to the root URL
app.use(express.json());
app.get("/configurations/unique/poid", getUniqueConfigurationsPoid);
// app.get("/configurations/unique/category", getUniqueConfigurationsCategory);
// app.post('/configurations/filter/oid',filterConfigurationByOid)
app.post("/configurations/filter/poid", filterDataByPoid);
// app.post('/configurations/filter/category',filterConfigurationByCategory)
app.patch("/configurations/update/template", updateConfigurationTemplate);
app.patch(
  "/configurations/update/all/category",
  updateConfigurationsAllCategory
); //update all for categories
app.patch(
  "/configurations/update/all/DisplayKeyName",
  updateConfigurationsAllDisplayKeyName
);
app.patch(
  "/configurations/update/all/Helptext",
  updateConfigurationsAllHelptext
);
app.patch("/configurations/update/all/value", updateConfigurationsAllValue);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
