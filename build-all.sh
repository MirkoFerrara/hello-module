#!/bin/bash
set -e

echo "🚀 Building Hello Module..."

# Crea directory dist (se non esiste)
mkdir -p dist

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm install
npm run build:prod
cd ..

# Build backend
echo "📦 Building backend..."
cd backend
mvn clean package
cp target/hello-module-1.0.0.jar ../dist/backend.jar
cd ..

# Copia manifest in dist/
cp module.manifest.json dist/

echo ""
echo "✅ Build completato!"
echo "📁 Files in dist/:"
ls -lh dist/
```

### `.gitignore` (nella ROOT)
```
# Build outputs
dist/
target/
node_modules/

# IDE
.idea/
.vscode/
*.iml

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*