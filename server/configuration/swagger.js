import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'Quick Credit',
    version: '1.0.0',
    description: 'Quick Credit is an online lending platform that provides short term soft loans to individuals',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header',
    },
  },
  host: 'quickycredit.herokuapp.com',
  basePath: '/api/v1',
};

const options = {
  swaggerDefinition,
  apis: ['*/swagger/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
