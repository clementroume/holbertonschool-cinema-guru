# Utiliser une image Node.js légère
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances en premier (pour optimiser le cache Docker)
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install

# Copier tout le reste du code frontend
COPY . .

# Exposer le port de Vite
EXPOSE 3000

# Démarrer le serveur de développement Vite
CMD ["yarn", "dev", "--host"]