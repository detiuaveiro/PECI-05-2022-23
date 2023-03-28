import axios from 'axios';

const getAxiosConfig = (method, url) => {
    return {
        method: method,
        url: url,
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}



export default class Topology{

    getTopo = () =>
    {
        var Url = "http://localhost:8000/api/Topology";
        return axios(getAxiosConfig("GET", Url))
            .then((response) => {
                return response.data;
            });
    }
    getId = (Id) =>
    {
        var Url = "http://localhost:8000/api/Topology/" + Id;
        return axios(getAxiosConfig("GET", Url))
            .then((response) => {
                return response.data;
            });
    }
}

