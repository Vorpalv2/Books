const express = require(`express`);
const booksCollection = require("../schema/schema");
const router = express.Router();

// const data2 = {
//   title: "ID",
//   ratings: "Check",
//   notes: "Working with this",
// };
// const data3 = [
//   {
//     title: "ID",
//     ratings: "Check",
//     notes: "Working with this",
//   },
// ];

router.delete(`/:id`, async (req, res) => {
  const title = req.params.id;
  console.log(title);
  try {
    const result = await booksCollection.findOneAndDelete({ title: title });

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json({ message: "Document deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
});

router.post(`/`, async (req, res) => {
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
  console.log(typeof id);
  const data = await booksCollection.findOne({ isbn: id });

  try {
    res.render("idMatched.ejs", {
      title: data.title,
      ratings: data.ratings,
      notes: data.notes,
      detailed: data.detailed,
      date: data.date,
      isbn: data.isbn,
      src: `https://covers.openlibrary.org/b/isbn/${data.isbn}-M.jpg`,
    });
  } catch (error) {
    console.error({error:"error rendering the ejs file"})
  }
});

module.exports = router;
