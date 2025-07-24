const express=require('express');
const app=express();

app.get('/index/url',(req,res)=>{
res.send('Hello world|||||||||33333');
});



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});