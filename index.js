const express = require('express');
const { connectToMongoDB } = require("./connect");
const shellerRoute = require("./routes/shellerRoute");

const app = express();
const PORT = 3000;

console.log("run now db");
connectToMongoDB("mongodb://127.0.0.1:27017/shopping-data")
  .then(() => console.log("MongoDb connected")).catch((err) => console.log("Mongo error :", err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      status: 400,
      error: "Malformed JSON. Please send a valid JSON object like { \"id\": \"your_id_here\" }.",
    });
  }
  next();
});


app.get('/index/url', (req, res) => {
  res.send('Hello world|||||||||33333');
});

//Routes
app.use("/", shellerRoute);




app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});