# 💳 MyCard

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/react-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/vite-8-purple?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/tailwind-css-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/ci/cd-GitHub_Actions-blue?style=for-the-badge&logo=github-actions" />
  <img src="https://img.shields.io/badge/deploy-github_pages-black?style=for-the-badge&logo=github" />
</p>

<p align="center">
  Sistema moderno de controle de gastos compartilhados com foco em UX estilo fintech.
</p>

---

## 🌐 Demo

👉 [https://larioliveiraribeiro.github.io/mycard/](https://larioliveiraribeiro.github.io/mycard/)

---

## 📸 Preview

<p align="center">
  <img src="https://via.placeholder.com/800x400.png?text=Preview+do+Projeto" alt="preview" />
</p>

---

## 📌 Sobre o projeto

O **MyCard** é uma aplicação web para controle de gastos compartilhados (família, casal, etc.), com uma interface moderna inspirada em aplicativos financeiros.

---

## 🎯 Objetivos

* Organização financeira simples
* Visualização clara de gastos
* Simular aplicação real de mercado

---

## 🧠 Arquitetura

```
src/
  components/   → UI reutilizável
  pages/        → páginas principais
  data/         → fonte única de dados
  services/     → regras e persistência (api.js)

.github/
  workflows/    → CI/CD com GitHub Actions
```

---

## ▶️ Como rodar localmente

### Pré-requisitos

* Node.js (recomendado v20+ ou v22+)
* npm ou yarn

### 1. Clonar o repositório

```bash
git clone https://github.com/lariOliveiraribeiro/mycard.git
```

### 2. Entrar na pasta do projeto

```bash
cd mycard
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Rodar o projeto

```bash
npm run dev
```

👉 O app estará disponível em:

```
http://localhost:5173
```

---

## 🚀 Tecnologias

* React + Vite
* JavaScript
* Tailwind CSS
* Recharts
* LocalStorage
* Git + GitHub
* GitHub Pages
* GitHub Actions (CI/CD)

---

## 📦 Funcionalidades

### 👥 Pessoas

* Criar, editar e remover

### 💸 Gastos

* Cadastro completo com filtros
* Persistência local

### 🔎 Filtros

* Pessoa
* Categoria
* Mês

### 📊 Gráficos

* Pizza (visão geral)
* Barras (por categoria)

---

## 💾 Persistência

Utiliza **LocalStorage** para armazenar dados no navegador.

---

## ⚙️ Deploy

### 🔹 Estrutura de Branches

* `main` → produção (código estável)
* `develop` → desenvolvimento (integração)
* `feature/*` → novas funcionalidades
* `gh-pages` → aplicação buildada (GitHub Pages)

### 🔹 Fluxo de Desenvolvimento

```bash
# Criar branch feature
git checkout -b feature/nova-funcionalidade

# Fazer commit e push
git add .
git commit -m "feat: descrição"
git push -u origin feature/nova-funcionalidade

# Criar PR para develop
# Após merge, fazer deploy
git checkout develop
git pull origin develop
npm run deploy
```

---

## ⚙️ CI/CD

O projeto utiliza **GitHub Actions** para automação de build e testes:

* **Trigger**: Push e Pull Requests para `main` e `develop`
* **Matrix**: Testa em Node.js 20.x e 22.x
* **Steps**: Install dependencies → Lint → Build → Upload artifacts
* **Arquivo**: `.github/workflows/ci.yml`

---

## ⚠️ Problemas resolvidos

* JSX quebrado
* Imports incorretos
* Dados duplicados
* Configuração de deploy
* Site em branco (erro de base no Vite)
* Compatibilidade do Vite 8 com Node.js 18 (atualizado para 20+/22+)
* Configuração de CI/CD com GitHub Actions

---

## 🧠 Aprendizados

* Arquitetura de projetos React
* Deploy com GitHub Pages
* Debugging em produção
* Separação de responsabilidades
* CI/CD com GitHub Actions
* Git Flow com branches main/develop/feature
* Compatibilidade de versões (Node.js + Vite)

---

## 🚀 Próximos passos

* 🔐 Autenticação de usuários
* 📱 Responsividade avançada
* 🎨 Animações (UX)
* 🧠 Gerenciamento de estado global

---

## 👨‍💻 Autor

Desenvolvido como evolução prática em desenvolvimento frontend.

---

## ⭐ Contribuição

Sinta-se livre para contribuir ou usar como base de estudo.

---

<p align="center">
  Feito com dedicação 🚀
</p>
