# Basisimage, das Node.js und npm enthält
FROM node:14

# Arbeitsverzeichnis im Container erstellen
WORKDIR /app

# Abhängigkeiten kopieren und Installation ausführen
COPY package.json ./
RUN npm install

# Alle Dateien im aktuellen Verzeichnis in das Arbeitsverzeichnis im Container kopieren
COPY . .

# Anwendung bauen
RUN npm run build

# Port der Anwendung
EXPOSE 3000

# Befehl, der die Anwendung beim Start des Containers ausführt
CMD ["npm", "start"]
