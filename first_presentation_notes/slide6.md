# O que esperamos fazer com isto

Tal como foi falado anteriormente, existem já projetos desenvolvidos que visam alcançar monitorização de SDN, com ou sem recurso a P4.

O que não é realçado nos projetos estudados é como é feito o **processamento desta monitorização**, ou quais as utilidades diretas da telemetria destas redes na **automatização da reconfiguração das mesmas**.

Algo que também não é referido por nenhum dos projetos, é a possivel concepção de uma unico servico centralizado, **dashboard like**. Apesar de já existirem algumas soluções de controladores de SDN, como o ONOS (Open Network Operating System), este apenas possui a sua própria Web UI que é um pouco limitada

# Como podemos então melhorar ?

Uma vez que temos as peças, queremos primeiro de tudo, tentar montá-las, não faz sentido reinventar a roda. Utilizando os serviços da ONOS, queremos explorar a possibilidade de **extender a capacidade do seu API Northbound** e ou **CLI** de duas formas:

## Monitorização

Exportar uma stream de dados **Prometheus readable**
  - O **Prometheus** é um sistema de monitorização que permite fazer um **processamente de metricas que recebe de outros serviços** e depois exporta estas metricas no seu proprio GUI e/ou abrindo API que possam ser explorados por outros serviços como **Grafana** que nos permite fazer visualização de informação através de **grafismos**.
  - Criar um sistema de **alertas**.
    - Estes alertar poderam ser baseados em metricas definidas/calculadas por nos, por exemplo, tal como um dos projetos fez a análisde de *heavy-hitters*, também nos podemos criar este tipo de análise, para detentar algo como um DDOS, e como base nesse calculo atráves de dados do ONOS, envia-los para o Prometheus.
  - Criar uma database de *long-term* com serviços como **Grafana Mimir** que nos permite manter o registo de tráfego passado.

## Reação

Utilizando o CLI esperamos conseguir integra-lo no noss sistema de forma a **injetar comandos diretamente no ONOS** de forma a controlar a nossa rede. Isso poderá ser feito, expondo esta capacidade atráves de simples **interações do utilizador-dashboard** ou, aquilo que seria mais interessante, criar **fluxos de comandos** com base em regras criadas a**pós análise da rede em tempo real**.

Isto pode passar por:
- A **lterar a rota de determinados fluxos** que possam estar a congestionar serviços num local onde não tem que passar necessáriamente.
- Impor limitação de tráfego, de forma **quantitativa ou qualitativa**.
  - Podemos limitar consoante **destino**, **origem**, ou **caminho**.
  - Ou quanto ao numero de **packets por periodo de tempo**.
  - Criar e apagar novas VLANS por exemplo.
- Por fim, também interessante neste modelo em particular, tal como o João falou, este cenário será baseado em *software switchs*, e sendo assim podemos explorar a possibilidade de **criar e remover novos vSwitchs dinamicamente** para simular o expandir da rede para comportar fluxo mais elevados de tráfego.