// index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello Jenkins - 23127264-23127316');
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
