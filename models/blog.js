const { Schema, model} = require("mongoose");

const blogSchema = new Schema ({

});

const Blog = model("blog", blogSchema);

module.exports = Blog;