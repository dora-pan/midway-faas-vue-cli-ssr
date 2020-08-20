# midway-faas-vue-cli-ssr
A SSR project with vue-cli-service and midway-faas.

## 安装

### 全局安装 midway cli 工具

```
npm i @midwayjs/faas-cli -g
```

### 安装项目依赖

```
npm install
```

## 开发模式

### 客户端渲染 CSR + 函数开发

```
npm run dev:csr
```

### 服务端渲染 SSR + Mock 开发

```
npm run dev:ssr
```

## 前端构建编译

### 客户端渲染 CSR

```
npm run build:csr
```

### 服务端渲染 SSR

```
npm run build:ssr
```

## 函数部署

### 发布到阿里云函数计算平台

```
f deploy
```
