const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // Ensure body-parser middleware is added
app.use('/api/auth', authRoutes); // Mount the routes

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
