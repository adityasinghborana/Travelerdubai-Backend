const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors({
  origin: 'http://69.48.163.45',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(express.json());
app.use('/', routes);



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});