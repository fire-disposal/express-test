const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    name: {
        type: String, // 修正了拼写错误
        required: true,
        minlength: 3, // 添加最小长度
        maxlength: 100 // 添加最大长度
    }
});

GenreSchema.virtual('url').get(function() {
    return '/catalog/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema); // 修正了拼写错误
