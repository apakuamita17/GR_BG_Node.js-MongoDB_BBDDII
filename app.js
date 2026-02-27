const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home (vista)
app.get('/', (req, res) => {
  res.render('home', { title: 'CETYS – Evaluación en Pandemia', apiOk: true });
});

// API base (JSON)
app.get('/api', (req, res) => res.json({ ok: true, message: 'API CETYS en ejecución' }));

// API rutas JSON
app.use('/api/students', require('./src/routes/students.routes'));
app.use('/api/instructors', require('./src/routes/instructors.routes'));
app.use('/api/courses', require('./src/routes/courses.routes'));
app.use('/api/assessments', require('./src/routes/assessments.routes'));
app.use('/api/submissions', require('./src/routes/submissions.routes'));

// Rutas MVC (vistas) para Assessments
app.use('/assessments', require('./src/routes/assessments.web.routes'));

// Conexión a la BD
const { MONGODB_URI, PORT = 3000 } = process.env;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Conectado a la BD');
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Error conectando a la BD:', err.message);
    process.exit(1);
  });
