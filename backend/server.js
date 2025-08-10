require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./src/config/db.js');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Middleware
const authMiddleware = require('./src/middleware/authMiddleware');

// Public route
app.get('/', (req, res) => {
  res.send('Vaultify Backend is running!');
});

// Secure API routes
const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// Routes
const bookmarkRoutes = require('./src/routes/bookmarks');
const aiTagRoutes = require('./src/routes/aiTags');
const raindropRoutes = require('./src/routes/raindrop');

apiRouter.use('/bookmarks', bookmarkRoutes);
apiRouter.use('/ai', aiTagRoutes);
apiRouter.use('/raindrop', raindropRoutes);

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
