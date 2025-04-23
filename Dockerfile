#Escoger imagen de docker para una aplicación Express.js
FROM smashmex1369/expressjs:v1

# Definir el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias necesarias
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 3000

# Definir el comando de inicio de la aplicación
CMD ["node", "app.js"]
