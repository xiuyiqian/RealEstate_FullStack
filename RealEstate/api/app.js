import express from 'express';
import postRoute from './routes/post.js'; 
import loginoutReg from './routes/auth.js';
import cookieParser from "cookie-parser";

const app = express();

// Corrected usage of express.json()
app.use(express.json());
app.use(cookieParser());

// Use the postRoute router for the /api/v3/post path
app.use('/api/v3/posts', postRoute);
app.use('/api/v3/auth', loginoutReg);

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
