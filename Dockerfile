#Escoger imagen de docker para una aplicación
FROM smashmex1369/expressjs:v1
# Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
# El primer . se refiere al directorio actual en el host, y el segundo . es
# el directorio de trabajo en el contenedor
COPY . .

# Instalar dependencias necesarias
RUN npm install

# Exponer el puerto de la aplicación
EXPOSE 3000

# Definir el comando de inicio de la aplicación
CMD ["node", "app.js"]
