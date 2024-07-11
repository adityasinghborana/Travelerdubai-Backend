const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const path = require('path');

app.use(
  cors({
    origin: "*",
  })
);
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));// to show static image file 
app.use(express.json());
app.use("/", routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
