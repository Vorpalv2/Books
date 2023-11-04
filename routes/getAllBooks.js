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
  const data = await booksCollection.find({});
  console.log(typeof data);
  res.render("index.ejs", { data: data });
});

router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const data = await booksCollection.findOne({ _id: id });
  res.render("idMatched.ejs", {
    title: data.title,
    ratings: data.ratings,
    notes: data.notes,
    detailed: data.detailed,
    date : data.date
  });
});

module.exports = router;
