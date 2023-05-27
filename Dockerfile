FROM node:latest

# Instalar o CLI do Back4App
RUN curl https://raw.githubusercontent.com/back4app/parse-cli/back4app/installer.sh | /bin/bash

# Copiar o diretório "cloud" e o package.json
COPY cloud/package.json ./

# Listar o conteúdo do diretório copiado
RUN ls -la

# Limpar o cache de dependências existentes
RUN npm cache clean --force

# Instalar as dependências
RUN npm install

# Instalar o Parse Server e o MongoDB
RUN npm install -g parse-server mongodb-runner

# Iniciar o MongoDB
RUN mongodb-runner start

# Definir as variáveis de ambiente
ENV APPLICATION_ID=TOMhAasW768J3xUcEmvCePlX9AwAzmdNtWmPABW6
ENV CLIENT_KEY=PDSKFep7Ax9DUunMrQoxOECmdd1c4gINfhUzbkGj
ENV MASTER_KEY=dBcRtZ6QJMxkMsbYcRuBZB9ziPCUY9pWelG75Ydm

# Iniciar o Parse Server usando as variáveis de ambiente
CMD parse-server --appId $APPLICATION_ID --clientKey $CLIENT_KEY --masterKey $MASTER_KEY --databaseURI mongodb://localhost/test
