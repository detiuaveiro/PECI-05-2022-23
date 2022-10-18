import React from 'react';
import { Container, Text } from '@chakra-ui/react';

const Calendar: React.FC = () => {

  return (
    <Container maxW='container.sm' color='black'>
        <br/><br/><br/><br/>
        <Text fontSize="xl">Tarefa 1 Estado da Arte e Aquisição de conhecimentos</Text>
        <br/><br/>
Ambientação à linguagem P4 <br/>
Análise das APIs de gestão externas (Prometheus)<br/>
Análise de soluções existentes SDN's Análise de literatura sobre deployment de serviços em ambientes inter-domínio <br/>
Desenvolvimento de um plano para o projeto<br/>
Distribuição de tarefas pelos membros<br/>
        <br/><br/>
        <Text fontSize="xl">Tarefa 2 Testes e análise de soluções existentes</Text>
        <br/><br/>

Análise mais profunda de soluções de service mesh e de gestão<br/>
Deployment de várias instâncias de kubernettes para realizar testes<br/>
Realização de testes e comparação das diferentes soluções nas diferentes instâncias (i.e., medir desempenho)<br/><br/>
<Text as='b'>Deliverable 1: Sintetização das caracterísitcas das diferentes soluções, principais lacunas identificadas, etc.)<br/>
Milestone 1:Noções concretas de possibilidades de melhoria das soluções analizadas</Text><br/>

        <br/><br/>
<Text fontSize="xl">Tarefa 3 Construção de um caso de uso de utilização</Text>
        <br/><br/>

Análise de casos de uso existentes de deployments de larga-escala/sistemas distribuídos/inter-domínio (i.e., dDesenvolvimento de um (mock-up?) serviço conceptual para validar num cenário de deployment inter-instâncias)<br/><br/>
<Text as='b'>Deliverable 2: Serviço conceptual desenvolvido</Text><br/>
<br/><br/>
<Text fontSize="xl">Tarefa 4 Arquitetura e desenvolvimento do portal</Text>
<br/><br/>
Análise e especificação do portal, suas interações externas e requisitos<br/>
Desenvolvimento de um protótipo preliminar<br/>
Validação preliminar<br/>
Análise e especificação final<br/>
Desenvolvimento do protótipo final<br/><br/>
<Text as='b'>
Deliverable 3: Arquitetura do portal concluída<br/>
Deliverable 4: Protótipo Final<br/>
Milestone 2: Protótipo pronto<br/>
</Text>
<br/><br/>
<Text fontSize="xl">Tarefa 5 Validação de desempenho e funcionalidades</Text>
<br/><br/>
Definição de um caso de uso para a validação<br/>
Integração do protótipo final com o (mock-up?) do serviço conceptual<br/>
Utilização do portal para instânciação do(s) serviço(s)<br/>
Análise e medição do desempenho do serviço vs. Sistema single-domain, etc.<br/><br/>
<Text as='b'>
Deliverable 5: Compilação dos resultados obtidos<br/><br/><br/><br/>
</Text>
    </Container>
  );
};

export default Calendar;
