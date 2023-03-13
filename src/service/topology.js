export default class Topology{
    
    getTopo = () =>
    {
        var Url = "http://192.168.1.91:9000/api/Topology";
        return fetch(Url)
            .then(response => response.json())
            .then(data => {return data});
    }
    getId = (Id) =>
    {
        var Url = "http://192.168.1.91:9000/api/Topology/" + Id;
        return fetch(Url)
            .then(response => response.json())
            .then(data => {return data});
    }
}

