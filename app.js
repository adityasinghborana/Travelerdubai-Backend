const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use('/', routes);



const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});