import React from "react";
import data from './dados.json';

class Links extends React.Component{
    state ={};
    constructor()
    {
        super();
        this.lista=data.links;
    }
    render()
    {
        return (
            <div className="Links">
                <h1>Links</h1>
                {
                    this.lista.map(valor =>{
                        return (
                            <div key={valor}>{valor[0]} - {valor[1]}</div>
                        )
                    })
                }
            </div>
        )
    }
}
export default Links;