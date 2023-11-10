import Client from './client.js';
import axios from "axios";

const NASA = "https://api.nasa.gov/mars-photos/api/v1"
export default class NasaClient extends Client{
    constructor(apiKey){
        super(NASA, apiKey);
    }

    getNameCameraPhotos(req, res) {
        let {name, camera} = req.params
        axios.get(`${NASA}/rovers/${name}/photos/?sol=1000&camera=${camera}&api_key=${process.env.API_KEY}`)
            .then(response => {
                console.log("getting response from Nasa")
                return response.data
            }).then(data => res.send(data))
    }

}