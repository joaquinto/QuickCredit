import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import users from './router/usersRouter';
import loans from './router/loansRouter';
import repayments from './router/repaymentsRouter';
import swaggerSpec from './configuration/swagger';

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, data: 'welcome to Quick Credit' });
});

app.use('/api/v1', users);
app.use('/api/v1', loans);
app.use('/api/v1', repayments);

app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('*', (req, res, next) => {
  res.status(404).json({ status: 404, error: 'Page not found' });
  next();
});

app.use((err, req, res) => {
  res.status(500).json({ status: 500, error: err.message });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


export default app;
