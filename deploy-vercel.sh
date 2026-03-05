#!/bin/bash

# Vercel 部署脚本
# 使用方式: ./deploy-vercel.sh

echo "🚀 开始部署到 Vercel..."

# 检查是否安装了 Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "📦 正在安装 Vercel CLI..."
    npm install -g vercel
fi

# 检查是否登录
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "🔑 请先登录 Vercel..."
    vercel login
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

# 部署到生产环境
echo "🚀 部署到 Vercel..."
vercel --prod

echo "✅ 部署完成!"
