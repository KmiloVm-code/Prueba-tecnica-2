import express from 'express';
import coockieParser from 'cookie-parser';

const app = express();
app.use(coockieParser());
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});