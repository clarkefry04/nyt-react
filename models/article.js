const mongoose = require('mongoose');

const Article = mongoose.model('Article', {
  url: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  headline: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  date: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {
  Article
};