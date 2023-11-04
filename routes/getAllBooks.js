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
  const id = req.params.id;
  console.log(id);
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
  // console.log(data.title);
  // foundItems.forEach((element) => {
  //   console.log(element.isbn);
  // });
  res.render("index.ejs", {
    data: foundItems,
    src: `https://covers.openlibrary.org/b/isbn/${foundItems.isbn}-M.jpg`,
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
