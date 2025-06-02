# 📞 Leads API

Uma API RESTful robusta para gerenciamento de **leads**, **campanhas** e **grupos**, desenvolvida com Node.js, Express e TypeScript. Utiliza Prisma ORM para comunicação eficiente com o banco de dados PostgreSQL. Ideal para sistemas de marketing, vendas ou CRM que necessitam de controle centralizado e estruturado sobre seus contatos e ações de engajamento.

## ✨ Principais Funcionalidades

### 👤 Leads
-  Listar todos os leads
-  Criar um novo lead
-  Visualizar detalhes de um lead específico
-  Atualizar informações de um lead
-  Remover um lead

### 👥 Grupos
-  Listar todos os grupos
-  Criar um novo grupo
-  Visualizar detalhes de um grupo
-  Atualizar informações de um grupo
-  Remover um grupo
-  Associar leads a grupos
-  Remover leads de grupos

### 📣 Campanhas
-  Listar todas as campanhas
-  Criar uma nova campanha
-  Visualizar detalhes de uma campanha
-  Atualizar informações de uma campanha
-  Remover uma campanha
-  Associar leads a campanhas
-  Atualizar o status de um lead em uma campanha
-  Remover leads de campanhas

## 🛠️ Tecnologias e Ferramentas

- **Node.js** – Runtime JavaScript para o backend
- **Express** – Framework leve para criação de APIs
- **TypeScript** – Tipagem estática para maior segurança e legibilidade do código
- **Prisma** – ORM moderno para integração com o PostgreSQL
- **PostgreSQL** – Banco de dados relacional robusto
- **Zod** – Validação de dados com segurança de tipos
- **Docker** – Containerização do ambiente de desenvolvimento
- **dotenv** – Gerenciamento de variáveis de ambiente
- **CORS** – Middleware para compartilhamento de recursos entre origens

## 🛠️ Instalação

1. Clone o repositório:
   ```bash
    git clone https://github.com/TiagoCoder2022/lead-api.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o arquivo .env:
    ```bash
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
    PORT=3000
    ```
4. Execute as migrations do banco:
    ```bash
    npx prisma migrate dev
    ```
5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse a API em ```http://localhost:3000/api```.

### Endpoints

Os endpoints estão definidos no arquivo ```src/router.ts```. Consulte o código para mais detalhes sobre os parâmetros e respostas.

## 📘 Prisma

- Para atualizar o schema:
  ```bash
  npx prisma generate
  ```
- Para visualizar o banco com o Prisma Studio:
  ```bash
  npx prisma studio
  ```
## Contribuição
  Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.
  
## 🧾 Licença
Este projeto está licenciado sob a licença MIT. Sinta-se à vontade para usar, modificar e distribuir.
   
