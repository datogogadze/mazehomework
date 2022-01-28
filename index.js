const express = require('express');
const app = express();
const router = require('./routers/maze');

app.use(express.json());
app.use(express.text());

app.use('/maze', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
