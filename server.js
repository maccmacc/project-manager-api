const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { APP_PORT, SERVICE_NAME } = require('./src/config/env');
const {
  usersRoute,
  projectsRoute,
  teamsRoute,
  teamsProjectRoutes,
  teamUsersRoutes,
} = require('./src/routes');

const db = require('./src/entities');

db.sequelize.authenticate()
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Manager Project',
    version: '1.0.0',
    description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', usersRoute);
app.use('/projects', projectsRoute);
app.use('/teams', teamsRoute);
app.use('/teams/:id/projects', teamsProjectRoutes);
app.use('/teams/:id/users', teamUsersRoutes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(APP_PORT, () => {
  console.log(`${SERVICE_NAME} is up.`);
});
