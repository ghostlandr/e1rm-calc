const express = require('express');
const helmet = require('helmet');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

const e1rmsRouter = require('./routes/e1rms');
const e1rmRouter = require('./routes/e1rm');
const userRouter = require('./routes/user');

app.use('/e1rms', e1rmsRouter);
app.use('/e1rm', e1rmRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
