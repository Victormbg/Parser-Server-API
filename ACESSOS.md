# Acesso ao Banco de Dados de Teste:

URL: https://www.db4free.net/signup.php

Banco de dados: bancodadosapi

Nome de usuário: adminapi

Senha: testeapi20

Email: victormbg2000@gmail.com

PHPMYADMIN: https://www.db4free.net/phpMyAdmin/

# Testar Localmente:

1. Instalar o parser-server: 
* npm install -g parse-server mongodb-runner

2. Iniciar o MongoDB 
* mongodb-runner start

3. Iniciar o Parse Server
* parse-server --appId TOMhAasW768J3xUcEmvCePlX9AwAzmdNtWmPABW6 --clientKey PDSKFep7Ax9DUunMrQoxOECmdd1c4gINfhUzbkGj --masterKey dBcRtZ6QJMxkMsbYcRuBZB9ziPCUY9pWelG75Ydm --databaseURI mongodb://localhost/local --allowClientClassCreation=false --allowExpiredAuthDataToken=false

# Uso da CLI do B4A

## Download do CLI do Back4App:
Link para baixar a interface de linha de comando (CLI) do Back4App:
https://www.back4app.com/docs/local-development/parse-cli

## Passos para usar a CLI:
1. Depois de baixar o b4a.exe, mova-o para:
* "C:\windows\system32"

2. Configure a Chave de Conta do Back4App:
* b4a configure accountkey

3. Usar o Account Key: Ks0YWlgODmyeEUaBAbbcJl75deujFmRUaAZCVC1e

4. Crie um novo projeto ou obtenha um já criado no Back4App:
* b4a new

4. Faça o deploy do código do Parser para o servidor do Back4App:
* b4a deploy

5. Defina as variáveis de ambiente no Back4App:
https://www.back4app.com/docs/platform/parse-environment-variables
