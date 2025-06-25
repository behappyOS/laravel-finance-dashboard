# 💰 Laravel Finance Dashboard
Um sistema de gestão financeira construído com Laravel 11 (backend) e React + Vite (frontend), utilizando Sanctum para autenticação e Docker para contêinerização.

## 📦 Tecnologias Utilizadas 

Backend (API)

- Laravel 11
- Laravel Sanctum
- MySQL
- Docker
- RESTful API

Frontend

- React 18
- Vite
- Axios
- TailwindCSS
- React Router DOM
- Context API

DevOps

- Docker
- Docker Compose

## 🚀 Como Rodar o Projeto

Pré-requisitos

- Docker + Docker Compose
- Make (opcional, para simplificar comandos)

1. Clone o Repositório
   ```bash
   git clone https://github.com/behappyOS/laravel-finance-dashboard.git
   cd laravel-finance-dashboard
   ````
2. Suba os containers
   ```bash
   docker compose up -d
   ````
   Isso irá subir os serviços app (Laravel), db (MySQL), nginx (proxy) e frontend (React).
    

3. Instale as dependências Laravel
   
Acesse o container:

```bash
docker exec -it laravel_app bash
````
Dentro do container:

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
````
4. Instale as dependências do React

Acesse o container React:

```bash
docker exec -it react_frontend bash
````
Dentro do container:

```bash
npm install
npm run dev
````

## 🔑 Rotas de Autenticação
Laravel Sanctum com autenticação via token:

- POST /api/register
- POST /api/login
- GET /api/user (Requer token Bearer)
- POST /api/logout (Requer token Bearer)

## 🧪 Testando a API via Postman
1. Registre um usuário via /api/register

2. Faça login e receba o token

3. Use o token como Bearer Token nas requisições autenticadas (ex: /api/user, /api/accounts)

## 📂 Estrutura de Pastas
```bash
laravel-finance-dashboard/
├── backend/              # Código Laravel (default: /var/www)
├── frontend/             # Projeto React com Vite
├── docker-compose.yml
└── ...
````

## 🐳 Docker Services
```bash
Serviço	        Porta Externa	  Container
Laravel API	8000	              laravel_app
React Front	5173	              react_frontend
Nginx	        80 (interno)	      nginx_laravel
MySQL	        3306	              mysql_laravel
````

## ✅ Funcionalidades

- Autenticação JWT (via Sanctum)
- Listagem e gerenciamento de contas
- Login com persistência de token
- Layout responsivo com Tailwind
- Dark/Light Theme Toggle
- Proteção de rotas com React Router + Context API

## 🛠️ Em Desenvolvimento

- Integração com categorias e transações
- Dashboard de gráficos
- Exportação de relatórios

## 🤝 Contribuições
Pull Requests são bem-vindos! Sinta-se à vontade para abrir issues ou sugerir melhorias.

## 📄 Licença
Este projeto está licenciado sob a MIT License.
