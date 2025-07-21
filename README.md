# 🌎 [Projeto Plan Your Trip]

Receba roteiros personalizados de viagem em questão de segundos! 
<br>[DEPLOY](https://plan-your-trip-cplb.onrender.com/)

## 📖 Sobre o Projeto

Através do site, você não precisa mais perder horas e horas pesquisando milhares de detalhes sobre cada viagem para construir um bom roteiro de viagem. Receba roteiros personalizados sugerindo atividades que vão desde ecoturismo até festivais locais e aproveite o melhor da sua viagem!

Através de uma interface intuitiva, o viajante pode customizar sua jornada com base em:
* **Perfil:** Viajante solo, casal, família ou amigos.
* **Orçamento:** Desde viagens econômicas até experiências de luxo.
* **Ritmo:** Roteiros mais tranquilos com poucas atividades por dia ou intensos com várias por dia.
* **Transporte:** Sugestões alinhadas baseadas no uso de transporte público, carro alugado ou outros meios.

* O grande diferencial é a funcionalidade **"Joias Escondidas"**, que permite ao usuário explorar destinos como um morador local, descobrindo lugares autênticos e pouco conhecidos que não fazem parte dos roteiros turísticos tradicionais. O objetivo é proporcionar viagens inesquecíveis e uma imersão cultural genuína.

## 🛠️ Tecnologias e Ferramentas

 - **React**: Construção da interface de usuário reativa e componentizada.

 - **TypeScript**: Tipagem estática para garantir a robustez, a manutenibilidade do código e prevenir erros críticos.

 - **Tailwind CSS**: Estilização utilitária para criar layouts complexos e responsivos de forma ágil.

 - **Gerenciamento de estado (Context API + useReducer)**: Gerenciamento de estado global para formulários e uso de context API para evitar prop drilling e deixar codigo mais clean.

 - **Swiper.js**: Implementação de carrosséis de imagens interativos e responsivos para as atrações turísticas.

 - **APIs**: Integração de inteligencia artificial ( Gemini ) com  APIs como Places API, Weather API, Geocoding API... para garantir roteiros personalizados com dados confiáveis

 - **Vitest & React Testing Library**: Testes unitários e de integração para garantir a qualidade, mockando chamadas de API e lidando com Promises para validar o comportamento de componentes assíncronos.

## ✨ Principais Funcionalidades
 - **Geração de Roteiros com IA**: Criação de itinerários detalhados e personalizados com base em múltiplos critérios do usuário.

 - **Integração com Previsão do Tempo**: Exibição da previsão do tempo para cada dia da viagem, ajudando no planejamento das atividades.

 - **Visualização de Atrações**: Apresentação de imagens reais dos pontos turísticos para enriquecer a experiência visual.

 - **Mecanismos de UX**: Interface aprimorada com autocomplete, estados de carregamento, tratamento de erros, skeleton loaders (e em breve com autocomplete de endereço).

 - **Layout 100% Responsivo**: Experiência de usuário consistente em dispositivos mobile, tablets e desktops.

## 💡 Aprendizados
Através do desenvolvimento do "Plan Your Trip", os principais pontos de evolução foram:

 - **Domínio de TypeScript em Aplicações Complexas**:
   - Aplicação de tipagem estática para prevenir erros críticos com null e undefined.
   - Criação de tipos personalizados reutilizáveis com interface e type para garantir a consistência dos dados entre componentes.
   - Uso de técnicas avançadas como narrowing para refinar tipos.
 - **Arquitetura de Código Robusta e Escalável**:
   - Refatoração do código aplicando princípios SOLID para criar uma arquitetura mais limpa, coesa e de fácil manutenção.
   - Implementação de uma estratégia de tratamento de erros robusta, utilizando throw new Error para propagar exceções entre funções e gerenciá-las de forma centralizada no estado da UI.
 - **Orquestração de APIs e Experiência do Usuário (UX)**:
   - Integração de dados de múltiplas APIs (Google, Weather) para compor um resultado final unificado e coeso para o usuário.
   - Aprimoramento significativo da UX com a implementação de mecanismos de feedback, como estados de carregamento, tratamento de erros e skeleton loaders para melhorar a performance percebida.
 - **Aprofundamento em Testes Automatizados**:
   - Evolução do estudo de testes, iniciando com Jest e aprofundando com Vitest e React Testing Library.
   - Desenvolvimento de habilidades para mockar chamadas de API e lidar com Promises em testes, garantindo a confiabilidade de componentes que dependem de dados assíncronos e documentando o comportamento esperado do código.

## 📱 Demonstração

PÁGINA INICIAL E FORMULÁRIO DE PREFERÊNCIAS
![chrome-capture-2025-7-21 (4) (1)](https://github.com/user-attachments/assets/e762b24d-f268-461c-a235-3f9337373cc6)


GERAÇÃO DO ROTEIRO COM SKELETON LOADER
![chrome-capture-2025-7-21 (online-video-cutter com)](https://github.com/user-attachments/assets/8d6f3765-cf58-45d2-abc3-bf2f92995ca2)



RESULTADO DO ROTEIRO PERSONALIZADO
![chrome-capture-2025-7-21 (1)](https://github.com/user-attachments/assets/f734fefb-b677-428b-8bba-16b0305f05a1)

RESPONSIVIDADE
![chrome-capture-2025-7-21 (2)](https://github.com/user-attachments/assets/5eb863a3-f3c8-4a4f-a5bc-42453379179d)


## 📋 Roadmap
 - [x] Estrutura do Formulário de Preferências

 - [x] Integração com a API do Google Gemini para Geração de Roteiros

 - [x] Integração com APIs de Tempo e Locais do Google

 - [x] Implementação de Testes Unitários e de Integração

 - [x] Responsividade Completa (Mobile-first)

 - [x] UX Aprimorada (Loaders, Error Handling)

 - [ ] Implementação da Seção de Mapa Interativo

 - [ ] Sistema de Contas de Usuário para Salvar Roteiros

 - [ ] Funcionalidade para Compartilhar Roteiros
 - [ ] Sistema de autocomplete de endereço




