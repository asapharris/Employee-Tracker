const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../notes.html'));
});

// db.query 


app.listen(PORT, () =>
  console.log(`Server available at http://localhost:${PORT}`)
);