const express = require("express");
const tag = require("../models/tag");
const router = express.Router();
const Tag = require("../models/tag");

//All Tags Route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== "") {
    searchOptions.name = new RegExp(req.query.name, "i");
  }
  try {
    const tags = await Tag.find(searchOptions);
    res.render("tags/index", {
      tags: tags,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
    console.log("Database could not be reached.");
  }
});

//New Tag Route
router.get("/new", (req, res) => {
  res.render("tags/new", { tag: new Tag() });
});

//Create Tag Route
router.post("/", async (req, res) => {
  const tag = new Tag({
    name: req.body.name,
  });

  try {
    const newTag = await tag.save();
    //res.redirect('authors/${newTag.id}')
    res.redirect("tags");
  } catch {
    res.render("tags/new", {
      tag: tag,
      errorMessage: "Error creating tag",
    });
  }
});

module.exports = router;
