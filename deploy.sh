#!/bin/bash

# 部署脚本 - 避免切换分支导致 vite 缓存损坏

# 1. 确保在 main 分支
git checkout main

# 2. 清理并重新安装依赖（避免缓存问题）
rm -rf node_modules package-lock.json dist .vite
npm install

# 3. 构建
npm run build

# 4. 保存 dist 内容到临时目录
mkdir -p /tmp/fabu-deploy
cp -r dist/* /tmp/fabu-deploy/

# 5. 切换到 gh-pages 分支
git checkout gh-pages

# 6. 删除 gh-pages 上的 node_modules（如果存在）
rm -rf node_modules .vite

# 7. 复制构建文件到 gh-pages
cp -r /tmp/fabu-deploy/* .

# 8. 提交并推送
git add .
git commit -m "Deploy update"
git push origin gh-pages

# 9. 切回 main 分支
git checkout main

# 10. 清理临时目录
rm -rf /tmp/fabu-deploy

# 11. 重新安装依赖（避免缓存问题）
rm -rf node_modules package-lock.json .vite
npm install

echo "部署完成！"
