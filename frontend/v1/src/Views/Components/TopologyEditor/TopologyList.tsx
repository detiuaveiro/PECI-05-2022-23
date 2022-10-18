import React from "react";
import { getTopologies } from "../../../Infrastructure/topologyService";
import Async from 'react-async';

const TopologyList : React.FC = () => <Async promiseFn={getTopologies}>
    {({ data, error, isLoading }) => {
        console.log(data, error, isLoading);
        if (isLoading)
            return "Loading...";
        if (error)
            return `Something went wrong: ${error.message}`;
        if (data)
            return (
                <div>
                    <h2>React Async - Users</h2>
                    {data}
                </div>
            );
    } }
</Async>;

export default TopologyList;