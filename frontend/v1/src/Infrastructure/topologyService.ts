import settings from './settings.json';



export const getTopologies = () =>
    fetch(settings.backend + "topology/")
        .then(res => (res.ok ? res : Promise.reject(res)))
        .then(res => res.json());
