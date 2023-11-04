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

router.post(`/`, async (req, res) => {
  newBook = await new booksCollection({
    title: req.body.title,
    ratings: parseInt(req.body.ratings),
    notes: req.body.notes,
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
  console.log(data)
  res.render("index.ejs", { data: data });
});

router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  const data4 = await booksCollection.findByid(id)
  data4.forEach((element)=>{
    console.log(element.title)
  })
  res.render("idMatched.ejs", { data4: data4});
});

module.exports = router;
