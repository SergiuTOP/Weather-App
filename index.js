import express, { request } from "express";
import axios from "axios";
import bodyParser from "body-parser";
import jsdom from "jsdom";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const APIKey = "gw7xrzt6vmw5l9r9oryziielfgbj5itimu2jvmz3";
const API_URL = "https://www.meteosource.com/api/v1/free/point";

app.use(express.static("public"));

// I create a GET method in order to get the data from the API then I render the index.ejs file
app.get("/", async (req, res) => {
  try {
    const input = req.query.input;
    const result = await axios.get(API_URL, {
      params: {
        place_id: "chisinau",
        sections: "all",
        timezone: "Europe/Chisinau",
        language: "en",
        units: "metric",
        key: APIKey,
      },
    });
    res.render("index.ejs", {
      city: "chisinau",
      precipitation: result.data.current.precipitation.type,
      lat: result.data.lat,
      lon: result.data.lon,
      temp_min: result.data.daily.data[0].temperature_min,
      temp_max: result.data.daily.data[0].temperature_max,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

//    I used a post method in order to get the value from the input 
// in ejs file and use it in API url in order to get the data for 
// that city and then I render the index.ejs file
app.post("/add", async (req, res) => {
  try {
    const inputValue = req.body.place;
    const result = await axios.get(API_URL, {
      params: {
        place_id: inputValue,
        sections: "all",
        timezone: "Europe/Chisinau",
        language: "en",
        units: "metric",
        key: APIKey,
      },
    });
    res.render("index.ejs", {
      city: inputValue,
      precipitation: result.data.current.precipitation.type,
      lat: result.data.lat,
      lon: result.data.lon,
      temp_min: result.data.daily.data[0].temperature_min,
      temp_max: result.data.daily.data[0].temperature_max,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
