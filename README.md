# CETYS – Evaluación del aprendizaje en pandemia (Node.js + MongoDB) – MVC + EJS

Proyecto académico con **5 colecciones**, **módulo CRUD + consulta sencilla** y **vistas EJS (MVC)**.

## Requisitos
- Node 18+ y npm
- MongoDB local (o Atlas)

## Instalación
```bash
git clone <URL-DE-TU-REPO>
cd cetys-pandemia-mvc
npm install
cp .env.example .env
# Edita .env y ajusta MONGODB_URI si es necesario
```

## Poblar datos de ejemplo
```bash
npm run seed
```

## Ejecutar (API + Vistas)
```bash
npm start
```
- API: http://localhost:$PORT/
- Vistas MVC: http://localhost:$PORT/ (Home) y /assessments (CRUD web)

## Endpoints API (JSON)
- `GET /api/students`
- `GET /api/instructors`
- `GET /api/courses`
- `GET /api/assessments`
- `GET /api/submissions`
- **Consulta sencilla:** `GET /api/assessments/search/by-modality?modality=online`

## Vistas (CRUD web con EJS)
- `GET /assessments` (lista)
- `GET /assessments/new` (form crear)
- `POST /assessments` (crear)
- `GET /assessments/:id/edit` (form editar)
- `PUT /assessments/:id` (actualizar)
- `DELETE /assessments/:id` (eliminar)

## Estructura
```
cetys-pandemia-mvc/
├─ app.js
├─ package.json
├─ .env.example
├─ .gitignore
├─ README.md
├─ src/
│  ├─ models/
│  ├─ controllers/
│  └─ routes/
├─ scripts/
├─ views/
│  ├─ partials/
│  └─ assessments/
└─ public/
```

## Capturas (para entregar)
- MongoDB Compass/Atlas mostrando **5 colecciones**
- Documentos (≥4) dentro de una colección
- Terminal con **"Conectado a la BD"** al ejecutar `npm start`

## Licencia
MIT
