## Stuwards

### 📘 Visão Geral

O **Sistema de Moeda Estudantil** tem como objetivo incentivar o reconhecimento do mérito acadêmico por meio de uma moeda virtual. Essa moeda é distribuída por professores a seus alunos e pode ser trocada por produtos ou descontos oferecidos por empresas parceiras.

O projeto está sendo desenvolvido de acordo com a **arquitetura MVC (Model-View-Controller)**, utilizando boas práticas de engenharia de software, versionamento contínuo e modelagem UML.

### 🚀 Release 1 – Escopo e Entregas

A **Release 1** compreende a primeira versão funcional do sistema, voltada à estruturação dos principais módulos, modelagem de dados e funcionalidades básicas.

#### **Objetivos Principais**

- Implementar a modelagem inicial do sistema, incluindo:
  - Diagrama de Casos de Uso  
  - Histórias de Usuário  
  - Diagrama de Classes  
  - Diagrama de Componentes  
- Definir e implementar a estratégia de acesso ao banco de dados, adotando padrões de persistência (ORM ou DAO).  
- Criar os CRUDs iniciais de:
  - Aluno  
  - Empresa Parceira  
- Desenvolver e integrar o front-end e o back-end desses módulos.  
- Apresentar a arquitetura base e a camada de persistência do sistema.

### 🚀 Release 2 – Funcionalidades Avançadas e Integração

A Release 2 abrange a ampliação das funcionalidades do sistema, com foco na implementação dos principais casos de uso relacionados ao envio de moedas, consulta de extrato e gerenciamento de vantagens.

#### **Objetivos Principais**

- Implementar os casos de uso de:
  - Envio de moedas e consulta de extrato (professores e alunos)
  - Cadastro e listagem de vantagens (empresa parceira e aluno)
  - Troca de vantagens (aluno)
- Elaborar os Diagramas de Sequência correspondentes.
- Integrar as novas funcionalidades entre o front-end e o back-end.
- Apresentar demonstração funcional dos módulos desenvolvidos.


## 🧩 Tecnologias Utilizadas

O desenvolvimento do sistema foi estruturado em duas principais camadas:

### 🔹 **Front-end**
- **Framework:** React  
- **Linguagem:** TypeScript  
- **Bibliotecas e Ferramentas:**  
  - React Router DOM (navegação entre páginas)  
  - Axios (requisições HTTP para o back-end)  
  - Tailwind CSS (estilização responsiva e moderna)  

O front-end é responsável pela interface de interação com os usuários (alunos, professores e empresas), permitindo a visualização e gerenciamento das moedas estudantis e das transações realizadas.

### 🔹 **Back-end**
- **Framework:** Spring Boot  
- **Linguagem:** Java  
- **Banco de Dados:** Postgress  
- **Ferramentas:**  
  - Spring Data JPA (mapeamento objeto-relacional)  
  - Spring Web (criação de endpoints REST)  
  - Lombok (simplificação do código)  
  - Postman (testes de rotas e integração)

O back-end gerencia as regras de negócio, persistência de dados e autenticação, expondo endpoints REST para consumo pelo front-end.


## 🏗️ Arquitetura do Sistema

A aplicação segue o padrão **MVC (Model-View-Controller)** e foi organizada em três camadas principais:

1. **Model:** Contém as entidades de domínio, responsáveis por representar os dados centrais do sistema, como Aluno, Professor, Empresa e Transação.  
2. **Controller:** Gerencia as requisições HTTP, conectando o front-end às regras de negócio e aos serviços de persistência.  
3. **Repository/Service:** Responsáveis pelo acesso e manipulação de dados no banco, garantindo a separação de responsabilidades e a manutenção da integridade da aplicação.


## 👥 Colaboradores

- Jonathan Silva  
- Matheus Fernandes
- Victor Gabriel
- Vitor Hugo


## 👨‍🏫 Professor Orientador

**João Paulo Carneiro Aramuni**  
Disciplina: Laboratório de Desenvolvimento de Software  
Curso: Engenharia de Software – PUC Minas  
