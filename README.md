ToDo List API
Uma API RESTful simples para gerenciar listas de tarefas, com foco em demonstrar as práticas modernas de DevOps.

Visão Geral do Projeto
Este repositório contém uma aplicação backend em Node.js/Express que permite a criação e consulta de tarefas. A aplicação utiliza um banco de dados SQLite para persistência dos dados. O principal objetivo deste projeto não é a funcionalidade da API em si, mas sim a implementação de um fluxo de trabalho de DevOps completo, incluindo:

Automação de CI/CD com GitHub Actions

Containerização com Docker

Infraestrutura como Código (IaC) com Terraform

Backup automatizado do banco de dados

Monitoramento de Custos na nuvem

Funcionalidades da API
A API oferece os seguintes endpoints:

GET /tasks: Retorna uma lista de todas as tarefas.

POST /tasks: Cria uma nova tarefa. O corpo da requisição deve ser um JSON com a propriedade title.

Artefatos de DevOps
GitHub Actions (.github/workflows/ci-cd.yml): Um pipeline de CI/CD que é executado a cada push no branch main. Ele roda testes automatizados, constrói e envia a imagem Docker para o Docker Hub, e faz o deploy na máquina virtual EC2.

Docker (Dockerfile): O arquivo de configuração para criar uma imagem Docker da aplicação, garantindo que o ambiente de execução seja consistente em todos os lugares.

Terraform (terraform/): Arquivos de código que definem a infraestrutura na AWS. O Terraform é usado para provisionar a instância EC2 e configurar as regras de segurança (Security Group).

Backup (backup.sh): Um script que faz o backup do banco de dados SQLite para um bucket no S3.

Monitoramento: Utilizamos as ferramentas nativas da AWS (AWS Budgets) para monitorar os custos da infraestrutura.

Como Executar o Projeto
Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

Git

Docker e Docker Compose

Node.js e npm

Terraform

AWS CLI configurado com suas credenciais

Rodando Localmente
Clone este repositório:

Bash

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
Instale as dependências e inicie a aplicação com Docker Compose:

Bash

npm install
docker-compose up --build
A API estará disponível em http://localhost:5000.

Executando os Testes Automatizados
Os testes de unidade e de integração são executados automaticamente no pipeline de CI. Para rodá-los localmente:

Bash

npm test
Deploy e Infraestrutura
Deploy (CI/CD)
O deploy é completamente automatizado pelo GitHub Actions. A cada push para o branch main, o pipeline:

Faz o checkout do código.

Instala as dependências e executa os testes (npm test).

Se os testes passarem, ele constrói a imagem Docker da aplicação.

Faz o push da imagem para o Docker Hub.

Conecta-se via SSH à instância EC2 e executa um docker run para implantar a nova versão.

Para que o deploy funcione, você deve configurar os seguintes segredos no GitHub: DOCKER_USERNAME, DOCKER_PASSWORD, EC2_SSH_KEY, AWS_ACCESS_KEY_ID e AWS_SECRET_ACCESS_KEY.

Infraestrutura como Código (IaC)
A infraestrutura na AWS é gerenciada pelo Terraform. O arquivo terraform/main.tf define a máquina virtual EC2 e o grupo de segurança.

Para provisionar a infraestrutura:

Bash

# Na pasta terraform/
terraform init
terraform plan
terraform apply
Monitoramento de Custos
Para evitar surpresas com a fatura da AWS, um alerta de orçamento foi configurado no console da AWS usando o AWS Budgets. Ele notifica o proprietário da conta quando o gasto mensal se aproxima de um valor pré-definido.

Backup e Recuperação
O banco de dados (o arquivo database.db) é essencial para a aplicação. Para garantir a sua segurança, um script de backup (backup.sh) é executado diariamente por um cron job na instância EC2.

Funcionalidade do script:

Para o contêiner da aplicação.

Copia o arquivo database.db.

Faz o upload para um bucket no Amazon S3.

Reinicia o contêiner.

Próximos Passos e Melhorias
Este projeto pode ser expandido para incluir:

Integração de um banco de dados real, como o PostgreSQL.

Configuração de HTTPS usando Let's Encrypt.

Implementação de um pipeline de DevSecOps com escaneamento de vulnerabilidades em imagens Docker.
