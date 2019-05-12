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

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, data: 'welcome to Quick Credit' });
});

app.use('/api/v1/', users);
app.use('/api/v1/', loans);
app.use('/api/v1/', repayments);

app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((err, req, res) => {
  console.log(err);
  if (err) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send((500, err));
  }
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


export default app;
