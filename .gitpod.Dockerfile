FROM back4app/b4a_cli

# Instalação do Node.js e npm
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Instalar o Parse Server e o MongoDB
RUN npm install -g parse-server mongodb-runner

# Iniciar o MongoDB
RUN mongodb-runner start

# Definir as variáveis de ambiente
ENV APPLICATION_ID=TOMhAasW768J3xUcEmvCePlX9AwAzmdNtWmPABW6
ENV CLIENT_KEY=PDSKFep7Ax9DUunMrQoxOECmdd1c4gINfhUzbkGj
ENV MASTER_KEY=dBcRtZ6QJMxkMsbYcRuBZB9ziPCUY9pWelG75Ydm

CMD ["npm", "start"]
