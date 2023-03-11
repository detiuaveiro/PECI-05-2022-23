import React from "react";
import Switch from "./Switch.js"
import data from './dados.json';

class Switches extends React.Component{
    state ={};
    constructor()
    {
        super();
        this.lista=data.switches;
    }
    render(){
        return (
            <div className="Switches">
                <h1>Switches</h1>
                 {
                 Object.entries(this.lista).map(([key,value]) =>{
                     return (
                         <div key={key}><h1>{key}</h1>
                         <Switch filename={value.runtime_json} />
                         </div>
                     );
                 })
                }
            </div>
        )
    }
}
export default Switches;
