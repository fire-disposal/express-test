const Author = require("../models/author");
const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

// Display list of all Authors.
exports.author_list = asyncHandler(async (req, res, next) => {
  try {
    const list_authors = await Author.find().sort([["family_name", "ascending"]]).exec();
    // Successful, so render
    res.render("author_list", {
      title: "Author List",
      author_list: list_authors,
    });
  } catch (err) {
    return next(err);
  }
});

// Display detail page for a specific Author.
exports.author_detail = asyncHandler(async (req, res, next) => {
    
  const [author, author_books] = await Promise.all([
    Author.findById(req.params.id).exec(),
    Book.find({ author: req.params.id }, "title summary").exec(),
  ]);

  if (author == null) {
    const err = new Error("Author not found");
    err.status = 404;
    return next(err);
  }
  
  res.render("author_detail", {
    title: "Author Detail",
    author: author,
    author_books: author_books,
  });
});

// 由 GET 显示创建作者的表单
exports.author_create_get = asyncHandler(async (req, res, next) => {
  res.send("未实现：创建作者的 GET");
});

// 由 POST 处理作者创建操作
exports.author_create_post = asyncHandler(async (req, res, next) => {
  res.send("未实现：创建作者的 POST");
});

// 由 GET 显示删除作者的表单
exports.author_delete_get = asyncHandler(async (req, res, next) => {
  res.send("未实现：删除作者的 GET");
});

// 由 POST 处理作者删除操作
exports.author_delete_post = asyncHandler(async (req, res, next) => {
  res.send("未实现：删除作者的 POST");
});

// 由 GET 显示更新作者的表单
exports.author_update_get = asyncHandler(async (req, res, next) => {
  res.send("未实现：更新作者的 GET");
});

// 由 POST 处理作者更新操作
exports.author_update_post = asyncHandler(async (req, res, next) => {
  res.send("未实现：更新作者的 POST");
});
