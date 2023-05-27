FROM node:latest

# Instala o curl
RUN apt-get update && apt-get install -y curl

# Baixa a CLI do back4app
RUN curl https://raw.githubusercontent.com/back4app/parse-cli/back4app/installer.sh --output installer.sh && \
    chmod +x installer.sh && \
    ./installer.sh

# Atualzar o NPM
RUN npm install -g npm@latest

# Instalar o Parse Server e o MongoDB
RUN npm install -g parse-server mongodb-runner

# Iniciar o MongoDB
RUN mongodb-runner start

# Instalar o Git
RUN apt-get update && \
    apt-get install -y git

# Definir as variáveis de ambiente
ENV APPLICATION_ID=TOMhAasW768J3xUcEmvCePlX9AwAzmdNtWmPABW6
ENV CLIENT_KEY=PDSKFep7Ax9DUunMrQoxOECmdd1c4gINfhUzbkGj
ENV MASTER_KEY=dBcRtZ6QJMxkMsbYcRuBZB9ziPCUY9pWelG75Ydm

CMD ["npm", "start"]
