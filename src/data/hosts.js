import React from "react";

import data from './dados.json';

class Hosts extends React.Component{
    state ={};
    constructor()
    {
        super();
        this.lista=data.hosts;
    }
    render(){
        return (
            <div className="Hosts">
                <h1>Hosts</h1>
                 {
                 Object.entries(this.lista).map(([key,value]) =>{
                     return (
                         <div key={key}><h1>{key}</h1><h2>{value.ip}</h2></div>
                     );
                 })
                }
            </div>
        )
    }
}
export default Hosts;
