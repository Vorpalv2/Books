const express = require(`express`);
const booksCollection = require("../schema/schema");
const router = express.Router();


router.delete(`/:ISBN`, async (req, res) => {
  const ISBN = req.params.ISBN;
  console.log("ISBN is " + ISBN);
try {
  let response = await  booksCollection.findOneAndDelete({isbn : ISBN})
  if(response){
    res.sendStatus(200)
    alert("Deleted Successfully")
  }
  else if (response = {}){
    res.sendStatus(400)
    alert("Data Not Occured")
  }
  else{
    alert("some error occured")
  }
} catch (error) {
  console.error({"error" : error})
}

});

router.post(`/newBook`, async (req, res) => {
  newBook = await new booksCollection({
    title: req.body.title,
    ratings: parseInt(req.body.ratings),
    notes: req.body.notes,
    detailed: req.body.detailed,
    isbn: req.body.isbn,
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


router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const data = await booksCollection.findOne({ _id: id });
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
