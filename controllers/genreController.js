const genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");
const { body, validationResult } = require("express-validator/check");
const { sanitizeBody } = require("express-validator/filter");

// 显示所有的流派。
exports.genre_list = asyncHandler(async (req, res, next) => {
  try {
    const list_genre = await genre.find().sort({ name: 1 }).exec();
    res.render("genre_list", { title: "Genre List", genre_list: list_genre });
  } catch (err) {
    next(err);
  }
});

// 显示特定流派的详情页。
exports.genre_detail = asyncHandler(async (req, res, next) => {
  try {
    const [genreDetail, genreBooks] = await Promise.all([
      genre.findById(req.params.id).exec(),
      Book.find({ genre: req.params.id }).exec(),
    ]);

    if (!genreDetail) {
      const err = new Error("Genre not found");
      err.status = 404;
      return next(err);
    }

    res.render("genre_detail", {
      title: "Genre Detail",
      genre: genreDetail,
      genre_books: genreBooks,
    });
  } catch (err) {
    next(err);
  }
});

// 通过 GET 显示创建流派。
// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
  res.render("genre_form", { title: "Create Genre" });
});

// 以 POST 方式处理创建流派。
// Handle Genre create on POST.
exports.genre_create_post = [
  // Validate that the name field is not empty.
  body("name", "Genre name required").isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  sanitizeBody("name").trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a genre object with escaped and trimmed data.
    var genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if Genre with same name already exists.
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          // Genre exists, redirect to its detail page.
          res.redirect(found_genre.url);
        } else {
          genre.save(function (err) {
            if (err) {
              return next(err);
            }
            // Genre saved. Redirect to genre detail page.
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

// 通过 GET 显示流派删除表单。
exports.genre_delete_get = asyncHandler(async (req, res) => {
  res.send("未实现：流派删除 GET");
});

// 处理 POST 时的流派删除。
exports.genre_delete_post = asyncHandler(async (req, res) => {
  res.send("未实现：流派删除 POST");
});

// 通过 GET 显示流派更新表单。
exports.genre_update_get = asyncHandler(async (req, res) => {
  res.send("未实现：流派更新 GET");
});

// 处理 POST 上的流派更新。
exports.genre_update_post = asyncHandler(async (req, res) => {
  res.send("未实现：流派更新 POST");
});
