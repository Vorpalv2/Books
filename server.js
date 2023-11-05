const express = require(`express`);
const connectToDB = require("./database");
const app = express();
const ejs = require(`ejs`);
app.set(`view engine`, `ejs`);

app.use(express.static("public"));

const getAllBooks = require(`./routes/getAllBooks`);

app.use(express.urlencoded({ extended: true }));

app.use("/getAllBooks", getAllBooks);

app.listen(3000, async () => {
  console.log("connected to port 3000");
  await connectToDB();
});


app.get(`/`,(req,res)=>{
  res.send("Homepage")
})