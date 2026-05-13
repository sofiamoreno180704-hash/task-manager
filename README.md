# Task Manager 📝

Aplicación Full Stack para gestión de tareas con autenticación de usuarios.

## 🚀 Tecnologías

**Backend**
- Node.js + Express
- PostgreSQL
- JWT para autenticación
- bcryptjs para encriptación de contraseñas

**Frontend**
- React
- React Router DOM
- Axios

## ✨ Funcionalidades

- Registro e inicio de sesión con JWT
- Crear, completar y eliminar tareas
- Cada usuario solo ve sus propias tareas
- Rutas protegidas en frontend y backend

## ⚙️ Instalación

### Backend
```bash
cd backend
npm install
# Configura tu .env con los datos de PostgreSQL
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📁 Estructura

```
task-manager/
├── backend/
│   ├── src/
│   │   ├── config/      # Conexión a base de datos
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── middleware/  # Autenticación JWT
│   │   └── routes/      # Endpoints de la API
│   └── package.json
└── frontend/
    ├── src/
    │   └── pages/       # Login, Register, Tasks
    └── package.json
```