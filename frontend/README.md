# Murabei Test - Documentação do Projeto

## Visão Geral

Este projeto é parte de um desafio técnico para a Murabei Data Science, desenvolvido para demonstrar habilidades em Docker, Python, Next.js e SQLite3. A aplicação é composta por um frontend em Next.js e um backend em Python Flask, ambos executados em containers Docker.

## Estrutura do Projeto

- **`_docker-compose/`**: Contém arquivos para gerenciamento de containers Docker.
  - `.env`: Variáveis de ambiente para configuração do Docker.
  - `docker-compose.yml`: Configuração dos serviços Docker.
  - `docker-up.bash`: Script para iniciar os serviços Docker.
  - `docker.log`: Logs de execução dos serviços.

- **`backend/`**: API de gerenciamento de livros em Flask.
  - `app.py`: Código principal da API.
  - `books.json`: Arquivo de dados de exemplo para os livros.
  - `build.bash`: Script para criar a imagem Docker do backend.
  - `db.sqlite`: Banco de dados SQLite usado pela aplicação.
  - `Dockerfile`: Instruções de construção da imagem Docker.
  - `requirements.txt`: Dependências Python necessárias para o backend.

- **`frontend/`**: Aplicação frontend em Next.js usando TypeScript.
  - `.next/`: Diretório de build do Next.js.
  - `public/`: Arquivos públicos como imagens e ícones.
  - `src/`: Código-fonte do frontend.
    - `app/`: Contém as páginas e layout da aplicação.
    - `components/`: Componentes reutilizáveis da UI.
    - `hooks/`: Hooks personalizados.
    - `lib/`: Funções utilitárias.
    - `models/`: Definições de modelos de dados (e.g., `Book.ts`).
    - `schemas/`: Esquemas de validação.
    - `services/`: Lógica de interação com a API.
  - `Dockerfile`: Instruções de construção da imagem Docker.
  - `build.sh`: Script para criar a imagem Docker do frontend.

## Configuração e Execução

### Pré-requisitos

- **Docker**: Certifique-se de que o Docker está instalado e em execução.
- **Node.js**: Necessário para desenvolvimento local do frontend, se não estiver usando Docker.

### Construção e Execução dos Serviços

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/murabei-test.git
   cd murabei-test
   ```

2. **Inicie os Serviços com Docker Compose**:
   Navegue até a pasta `_docker-compose` e execute:
   ```bash
   docker-compose up --build
   ```

3. **Acesse a Aplicação**:
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador para acessar o frontend.

### Desenvolvimento

#### Frontend

Para iniciar o servidor de desenvolvimento localmente, execute:
  ```bash
  cd frontend
  npm run dev
  # ou
  yarn dev
  ```

### Estrutura de Diretórios do Frontend

- **`app/`**: Páginas e layout da aplica��ão.
- **`components/`**: Componentes reutilizáveis.
- **`hooks/`**: Hooks personalizados para lógica de funcionalidade.
- **`lib/`**: Funções utilitárias.
- **`models/`**: Modelos de dados.
- **`schemas/`**: Validação de dados.
- **`services/`**: Comunicação com a API.

### Funcionalidades

- **Listagem de Livros**: Mostra todos os livros registrados.
- **Busca por Título e Autor**: Filtra livros com base em critérios específicos.
- **Criação de Livros**: Permite adicionar novos livros.
- **Deleção de Livros**: Remove livros existentes.
- **UI com shadcn/ui**: Integração com componentes de UI para consistência visual.

### Testes

#### Unitários

Implementados com Jest, localizados em `__tests__/`.

Para executar testes unitários:
  ```bash
  npm test
  # ou
  yarn test
  ```

#### End-to-End

Implementados com Cypress, localizados em `cypress/e2e/`.

Para executar testes end-to-end:
  ```bash
  npm run cypress:open
  # ou
  yarn cypress:open
  ```

### Implantação

A aplicação pode ser implantada facilmente usando a plataforma [Vercel](https://vercel.com), que oferece suporte nativo para projetos Next.js. Consulte a [documentação de implantação do Next.js](https://nextjs.org/docs/deployment) para mais detalhes.

### Recursos Adicionais

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Docker](https://docs.docker.com)
- [Documentação do Flask](https://flask.palletsprojects.com)
