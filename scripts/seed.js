require('dotenv').config();
const mongoose = require('mongoose');

const Student = require('../src/models/student.model');
const Instructor = require('../src/models/instructor.model');
const Course = require('../src/models/course.model');
const Assessment = require('../src/models/assessment.model');
const Submission = require('../src/models/submission.model');

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Seed: conectado a la BD');

    // Limpieza
    await Promise.all([
      Submission.deleteMany({}),
      Assessment.deleteMany({}),
      Course.deleteMany({}),
      Student.deleteMany({}),
      Instructor.deleteMany({})
    ]);

    // Instructores
    const instructors = await Instructor.insertMany([
      { name: 'Carlos Pérez', department: 'Educación', email: 'carlos@cetys.edu', experienceYears: 8 },
      { name: 'Ana Rojas', department: 'Pedagogía', email: 'ana@cetys.edu', experienceYears: 5 },
      { name: 'Luis Díaz', department: 'Psicología', email: 'luis@cetys.edu', experienceYears: 10 },
      { name: 'María Gómez', department: 'Tecnología Educativa', email: 'maria@cetys.edu', experienceYears: 7 }
    ]);

    // Estudiantes
    const students = await Student.insertMany([
      { firstName: 'Juan', lastName: 'Martínez', email: 'juan@correo.com', city: 'Caracas', hasInternetAccess: true, deviceType: 'phone', riskLevel: 'medium' },
      { firstName: 'Ana', lastName: 'Luna', email: 'ana@correo.com', city: 'Maracaibo', hasInternetAccess: false, deviceType: 'none', riskLevel: 'high' },
      { firstName: 'Luis', lastName: 'Soto', email: 'luis@correo.com', city: 'Valencia', hasInternetAccess: true, deviceType: 'laptop', riskLevel: 'low' },
      { firstName: 'María', lastName: 'Suárez', email: 'maria@correo.com', city: 'Barquisimeto', hasInternetAccess: true, deviceType: 'tablet', riskLevel: 'medium' }
    ]);

    // Cursos
    const courses = await Course.insertMany([
      { title: 'Didáctica I', modality: 'online', semester: '2024-2', instructor: instructors[0]._id },
      { title: 'Evaluación Educativa', modality: 'hybrid', semester: '2024-2', instructor: instructors[1]._id },
      { title: 'Psicología del Aprendizaje', modality: 'in-person', semester: '2024-2', instructor: instructors[2]._id },
      { title: 'Tecnologías en Educación', modality: 'online', semester: '2024-2', instructor: instructors[3]._id }
    ]);

    // Evaluaciones
    const assessments = await Assessment.insertMany([
      { course: courses[0]._id, type: 'quiz', weight: 10, modality: 'online', pandemicAdjustment: true, date: new Date('2024-10-01') },
      { course: courses[1]._id, type: 'project', weight: 30, modality: 'in-person', pandemicAdjustment: false, date: new Date('2024-10-15') },
      { course: courses[2]._id, type: 'exam', weight: 40, modality: 'in-person', pandemicAdjustment: false, date: new Date('2024-11-01') },
      { course: courses[3]._id, type: 'presentation', weight: 20, modality: 'online', pandemicAdjustment: true, date: new Date('2024-11-10') }
    ]);

    // Entregas
    await Submission.insertMany([
      { assessment: assessments[0]._id, student: students[0]._id, score: 85, status: 'on-time' },
      { assessment: assessments[0]._id, student: students[1]._id, score: 72, status: 'late' },
      { assessment: assessments[1]._id, student: students[2]._id, score: 90, status: 'on-time' },
      { assessment: assessments[2]._id, student: students[3]._id, score: 60, status: 'on-time' }
    ]);

    console.log('Seed: datos insertados ✅');
  } catch (e) {
    console.error('Seed error:', e);
  } finally {
    await mongoose.disconnect();
    console.log('Seed: desconectado');
  }
}

run();
