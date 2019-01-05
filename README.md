# Setup

### Database

1. Instale o database postgres.
2. Crie uma conta de super usuário com o mesmo nome da conta que está sendo utilizada para testar este sistema.
3. As variáveis de ambiente `DB_USERNAME`, `DB_PASSWORD`, `DB_HOSTNAME` e `DB_NAME` podem ser utilizadas para controlar o servidor.
4. Execute `npm run db:setup`.

## Servidor

1. Execute `npm run build` para compilar o projeto.
2. Execute `npm start` para executar o projeto.

## Arquitetura

* `src/data`: contém exclusivamente código da parte client side do app
* `src/server`: contém exclusivamente código da parte server side do app,
incluindo a parte de banco dedados
* `src/data`: contém dados utilizados por ambos client e server, é utilizado
para garantir que ambos os lados estão com seus modelos de dados consistentes
