export default class Topology{
    
    getTopo = () =>
    {
        var Url = "http://localhost:8000/api/Topology";
        return fetch(Url)
            .then(response => response.json())
            .then(data => {return data});
    }
    getId = (Id) =>
    {
        var Url = "http://localhost:8000/api/Topology/" + Id;
        return fetch(Url)
            .then(response => response.json())
            .then(data => {return data});
    }
}

