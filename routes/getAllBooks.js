const express = require(`express`);
const booksCollection = require("../schema/schema");
const router = express.Router();

const newBookCheckData = {
  title : "The Gardener and the Carpenter - by Alison Gopnik",
  ratings : parseInt("10"),
  notes : "Great philosophy of parenting, from a grandmother who is a wise professor of philosophy and a developmental psychologist. Such a beautiful mindset and outlook. Required reading for every parent. Re-read it often as a necessary reminder",
  details : "I would not evaluate the quality of an old friendship by whether my friend was happier or more successful than when we first met.The most important rewards of being a parent come from the moment-by-moment physical and psychological joy of being with this particular child, and in that child’s moment-by-moment joy in being with you.Love’s purpose is not to shape our beloved’s destiny, but to help them shape their own.Don't change the people we love, but give them what they need to thrive.",
  isbn : "0374229708",
  date: Date.now(),
  _id: crypto.randomUUID()

}

router.put(`/:ISBN`,async(req,res)=>{
  const ISBN = req.params.ISBN;
  let newData ={
    title: req.body.title,
    ratings: parseInt(req.body.ratings),
    notes: req.body.notes,
    detailed: req.body.detailed,
    isbn: req.body.isbn,
  }
  try {
    let response = await booksCollection.findOneAndReplace({isbn : ISBN},newData)

    if(response){
      res.send("patched into Database Data with ISBN" + ISBN).status(200)
      }
      else{
       res.send("error occured with getting database").status(400)
      }
   } catch (error) {
    console.log(error)
   }



//get the data
//change it with new data
//update the data to database
})

router.delete(`/:ISBN`, async (req, res) => {
  const ISBN = req.params.ISBN;
  console.log("From Delete Route : ISBN is " + ISBN);
  try {
    let response = await booksCollection.findOneAndDelete({ isbn: ISBN });
    if (response) {
      res.status(200).send("deleted");
    } else if ((response = {})) {
      res.status(404).send("no data found");
    } else {
      res.status(404).send("error");
    }
  } catch (error) {
    console.error({ error: error });
  }
});

router.post(`/newBook`, async (req, res) => {
  let newBook = await new booksCollection({
    title: req.body.title||newBookCheckData.title,
    ratings: parseInt(req.body.ratings)||newBookCheckData.ratings,
    notes: req.body.notes||newBookCheckData.notes,
    detailed: req.body.detailed||newBookCheckData.detailed,
    isbn: req.body.isbn||newBookCheckData.isbn,
  });
  console.log("From POST Route : ISBN is " + newBook.isbn);
  await newBook
    .save()
    .then(() => {
      console.log("saved to Database");
    })
    .catch((err) => {
      console.log(err);
    });
  res.send(newBook);
});

router.get(`/`, async (req, res) => {
  const foundItems = await booksCollection.find({});

  res.render("index.ejs", {
    data: foundItems,
  });
});

router.get(`/:ISBN`, async (req, res) => {
  const ISBN = req.params.ISBN;
  console.log(`From Get By ID route ISBN is : ${ISBN}`)

  const data = await booksCollection.findOne({isbn:ISBN});
  res.render("idMatched.ejs", {
    title: data.title,
    ratings: data.ratings,
    notes: data.notes,
    detailed: data.detailed,
    date: data.date,
    isbn: data.isbn,
    src: `https://covers.openlibrary.org/b/isbn/${data.isbn}-M.jpg`,
  });
});

module.exports = router;
