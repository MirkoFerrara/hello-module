#!/bin/bash
set -e

echo "🔨 Building Hello Module Frontend..."

cd "$(dirname "$0")"

npm install
npm run build:prod

echo "✅ Frontend build completato: ../dist/module.umd.js"