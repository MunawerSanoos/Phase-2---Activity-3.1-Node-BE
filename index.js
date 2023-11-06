const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const hardcodedUser = {
  username: 'admin',
  password: 'adminpassword',
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === hardcodedUser.username && password === hardcodedUser.password) {
    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ username, token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
