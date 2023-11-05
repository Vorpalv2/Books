const express = require(`express`);
const booksCollection = require("../schema/schema");
const router = express.Router();

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
  newBook = await new booksCollection({
    title: req.body.title||"placeholderTitle",
    ratings: parseInt(req.body.ratings)||0,
    notes: req.body.notes||"placeholderNotes",
    detailed: req.body.detailed||"placeholderDetails",
    isbn: req.body.isbn||"placeholderISBN",
  });
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
    // isbn: foundItems.isbn,
  });
});

router.get(`/:ISBN`, async (req, res) => {
  const ISBN = req.params.ISBN;
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
