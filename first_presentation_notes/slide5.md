# Existing Work

 - Cisco Meraki  :  Cloud based network
 - Cradlepoint NetCloud  :  Cloud e em Hardware, software updates to endpoints
 - IBM SDN Services : Manage Cloud Networks, avaliação de estratégia WAN

## SDN control pane  

Com a pesquisa já feita na area das SDN's percebemos que existem 3 possiveis maneiras de implementar o control pane sendo estas:  

 - control pane Centralisado:
    - 1 nó de controlo tem a vista da rede por completo. Topologia mais usada nas primeiras soluções com SDN's.
    - Apesar de esta implementação simplificar a lógica de controlo, não permite que a rede escale para grandes dimenções.

 - Hierarquicamente:
    - 1 nó root e vários nós de controlo filhos, que enviam informções acerca da seção de redo pela qual são responsáveis ao root node, e este com uma visão global da rede toma decisões e propaga as mesmas para os filhos.

 - Control pane Distribuido:  
   - vários nós de controlo cada um responsável por uma secção da rede

Vamos tentar explorar as 3 soluções ao longo do desenvolvimento do projeto, de forma a adquirir melhor conhecimento em relaçãoàs vandagens e desvantagens de cada uma.  

## SDN data pane

Usando as regras explicitas pelo control pane, este é responsavel pelo processamento de pacotes de dados. O sitio onde o data pane é deployed ajudanos a classificar a SDN num de 3 tipos:  

  - Hardware based : switches que usam o protocolo OpenFlow e tabelas TCAM para tomada de decisões como routing de pacotes.

  - Software based : switches virtuais que implementam support a SDN através de software, um exemplo deste software é open vswitch, uma implementação de um switch multilayer virtual. 

  - Host based : em que a implementação da SDN está nos terminais de rede, e estes influenciam a mesma através do controlo de VLAN's e das regras de spanning tree protocol
    
Iremos forcarnos principalmente em implementações software based, devido ao preço elevado de switches com suporte a OpenFlow, com a hipótese de no segundo semestre testar-mos uma implementação hardware based.
