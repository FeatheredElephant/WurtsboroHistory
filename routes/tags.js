const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");

//All Tags Route
router.get("/", (req, res) => {
  res.render("tags/index");
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
