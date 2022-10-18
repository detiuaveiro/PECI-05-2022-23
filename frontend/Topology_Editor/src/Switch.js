
import React from "react";

class Switch extends React.Component{
        state = { isLoading: true}
        constructor(props){
                super(props);
                this.ficheiro=props.filename;
                //this.loadRunTime(props.filename);
        }
        componentDidMount(){
                this.loadRunTime(this.ficheiro);
        }
        loadRunTime(nome)
        {
                fetch('./'+nome,{
                        headers : { 
                          'Content-Type': 'application/json',
                          'Accept': 'application/json'
                         }
                      })
                .then( result => result.json())
                .then( dados => {
                        this.setState({
                                ficheiro: nome,
                                dados: dados,
                                isLoading: false
                        });
                });
        }
        render(){
                if (this.state.isLoading)
                return null;
                return(
                        <div>
                                <h3>{this.state.ficheiro}</h3>
                                <h3>{this.state.dados.p4info}</h3>
                                <ul>
                                {
                                        this.state.dados.table_entries.map((valor) =>{
                                                {if (valor.action_params.port!=undefined){ 
                                                        return (<li >
                                                                Port:{valor.action_params.port} |
                                                                | MAC: {valor.action_params.dstAddr} |
                                                                | IP: {valor.match["hdr.ipv4.dstAddr"]}
                                                                </li>)
                                                        }
                                                }
                                        })
                                }
                                </ul>
                        </div>
                )
        }
}
export default Switch;