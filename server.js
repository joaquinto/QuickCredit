import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import users from './server/router/usersRouter';
import loans from './server/router/loansRouter';
import repayments from './server/router/repaymentsRouter';
import swaggerSpec from './configuration/swagger';

const app = express();

const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.status(200).json({ status: 200, data: 'welcome to Quick Credit' });
});

app.use('/api/v1/', users);
app.use('/api/v1/', loans);
app.use('/api/v1/', repayments);


app.use('/docs-api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


export default app;
