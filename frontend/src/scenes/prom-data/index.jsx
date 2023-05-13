import React from 'react';
import Prometheus from "prometheus-react";
import Grafana from "grafana-react";

function promData() {
    return(
        <div>
            <h1>Prometheus React</h1>
            <Prometheus.PromQL query="up" url="http://localhost:9090" />
            <h1>Grafana React</h1>
            <Grafana.GrafanaPanel url="http://localhost:3000" uid="data" />
        </div>
    );
}

export default promData;