const axios = require('axios');
const router = require('express').Router();

const { Article } = require('../models/article');

router.get('/test', (req, res) => {
  res.json({
    'answer': 'ok'
  });
});

router.post('/articles', (req, res) => {
  let article = new Article({
    url: req.body.url,
    headline: req.body.headline,
    date: req.body.date
  });

  article.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

router.get('/articles', (req, res) => {
  Article.find().then((articles) => {
    res.send({articles});
  }, (e) => {
    res.status(400).send(e);
  })
});

router.delete('/articles', (req, res) => {
  Article.findByIdAndRemove(req.body.id).then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
})

router.post('/articles/saved', (req, res) => {
  Article.find().where('url').in(req.body.urls).then((docs) => {
    urls = docs.map(doc => doc.url);

    res.send(urls);
  }, (e) => {
    res.status(400).send(e);
  })
});

module.exports = router;