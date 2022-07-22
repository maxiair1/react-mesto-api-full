require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/users');
const { auth } = require('./middlewares/auth');
const { createUserValidation, loginValidation } = require('./middlewares/joiValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;
const options = {
  origin: [
    'http://localhost:3000',
    'http://maxiair.nomoredomains.xyz',
    'https://maxiair.nomoredomains.xyz',
    'http://api.maxiair.nomoredomains.xyz',
    'https://api.maxiair.nomoredomains.xyz',
    'https://maxiair1.github.io',
  ],
};

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', { useNewUrlParser: true })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(`cant connect to db: ${err.message}`));

app.use('*', cors(options)); // Подключаем первой миддлварой
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use(errorLogger);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена.'));
});
app.use(errors());
app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message, err });
  }
  res.status(500).send('что-то пошло не так');
  return next();
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
