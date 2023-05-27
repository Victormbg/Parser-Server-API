FROM back4app/b4a_cli

# Baixar e instalar o Node.js e npm
RUN curl -o node.tar.gz https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.gz
RUN tar -xzf node.tar.gz -C /usr/local --strip-components=1
RUN rm node.tar.gz

# Instalar o Parse Server e o MongoDB
RUN npm install -g parse-server mongodb-runner

# Iniciar o MongoDB
RUN mongodb-runner start

# Definir as variáveis de ambiente
ENV APPLICATION_ID=TOMhAasW768J3xUcEmvCePlX9AwAzmdNtWmPABW6
ENV CLIENT_KEY=PDSKFep7Ax9DUunMrQoxOECmdd1c4gINfhUzbkGj
ENV MASTER_KEY=dBcRtZ6QJMxkMsbYcRuBZB9ziPCUY9pWelG75Ydm

CMD ["npm", "start"]
