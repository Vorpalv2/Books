const express = require(`express`);
const booksCollection = require("../schema/schema");
const router = express.Router();

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
