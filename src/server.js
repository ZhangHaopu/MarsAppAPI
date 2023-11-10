import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

const app = express();
const port = 8000;
const NASA = "https://api.nasa.gov/mars-photos/api/v1"

if (process.env.NODE_ENV !== "production"){
    dotenv.config();
}


let obj;
app.use(express.json());
const router = express.Router();


router.get('/test', (req, res) => res.send('Hello world !'));
router.get('/rovers', (req, res) => {
    axios.get(`${NASA}/rovers?sol=3&api_key=${process.env.API_KEY}`)
        .then(response => {
            console.log("getting response from Nasa")
            return response.data
        }).then(data => res.send(data))

});

router.get('/rovers/photos', (req, res) => {
    axios.get(`${NASA}/rovers/${process.env.ROVER_NAME}/photos/?sol=1000&camera=${process.env.CAMERA}&api_key=${process.env.API_KEY}`)
        .then(response => {
            console.log("getting response from Nasa")
            return response.data
        }).then(data => res.send(data))
})

router.get('/rovers/:name/photos/:camera', (req, res) => {
    let {name, camera} = req.params
    axios.get(`${NASA}/rovers/${name}/photos/?sol=1000&camera=${camera}&api_key=${process.env.API_KEY}`)
        .then(response => {
            console.log("getting response from Nasa")
            return response.data
        }).then(data => res.send(data))
})


app.use('/', router);


app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});