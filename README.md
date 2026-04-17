# Trilhas Digitais - Escola Modelo de Conceição 🚀

Plataforma educacional moderna desenvolvida para a **Professora Regina Almada**, focada nas disciplinas de **História** e **Ensino religioso**.

## 🎯 Objetivo
Proporcionar uma experiência interativa e gamificada para os alunos do Ensino Fundamental II (6º ao 9º Ano), permitindo acesso fácil a atividades, links complementares e um mural de conquistas (badges).

## 🛠️ Tech Stack
- **Frontend**: React 19 + Vite 7
- **Estilização**: Tailwind CSS v4 (Design moderno, Glassmorphism, Paleta Azul Premium)
- **Animações**: Framer Motion
- **Ícones**: Lucide React
- **Backend / DB**: Firebase Firestore (Real-time synchronization)
- **Autenticação**: Firebase Authentication

## 🎨 Paleta de Cores
O projeto utiliza uma paleta azul profissional:
- Color 1: `#3c8efc` (Primary)
- Color 2: `#5ba7fd` (Secondary)
- Color 3: `#7abffe` (Accent)
- Color 4: `#98d8fe` (Highlight)
- Color 5: `#b7f0ff` (Background)

## 📁 Estrutura de Rotas
- `/` - Home (Seleção de Séries e Links da Hora)
- `/badges` - Mural das Conquistas
- `/objetivos` - Objetivos Pedagógicos
- `/login` - Acesso Administrativo
- `/admin` - Painel de Controle (Protegido por Firebase Auth)

## 🚀 Como Iniciar
1. Instale as dependências: `npm install`
2. Configure o arquivo `.env` com suas chaves do Firebase (veja o arquivo `.env` de exemplo).
3. Inicie o servidor: `npm run dev`

## 🔐 Área Administrativa
O Dashboard customizado permite:
- Inserir/Remover atividades por série e unidade.
- Gerenciar "Links da Hora".
- Visualizar alunos e suas conquistas.

---
**Desenvolvido por Antigravity (Advanced Agentic Coding - Google DeepMind)**
*Vibe Coding Edition*
