'use strict';
const express = require('express');
const validate = require('express-validation');
const validation = require('../validation/wineValidation');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const updateMaps = (wines) => {
  return {
    winesById: _.reduce(wines, (result, wine) => {
      result[wine.id] = wine;
      return result;
    }, {}),
    winesByRegion: _.groupBy(wines, wine => wine.appellation.region.toLocaleLowerCase()),
    winesByType: _.groupBy(wines, wine => wine.type.toLocaleLowerCase()),
  }
};

const comments = [
  'De la cuisse',
  'Jolie robe',
  'Belle longueur en bouche'
];
let wines = _.map(require('../data/wines.json'), wine => _.extend(wine, {pic: `${wine.id}/image`}));
_.sampleSize(wines, 7).map( wine => _.extend(wine, {
  date: Math.floor(Math.random() * (2015 - 1940) + 1940),
  rating: Math.floor(Math.random() * (5 - 1) + 1),
  comment: comments.pop(),
}));
let {winesById, winesByRegion, winesByType} = updateMaps(wines);

router.get('/', (req, res, next) => {
  const region = req.query.region;
  const type = req.query.type;
  const rated = !!req.query.rated;

  const winesWithRegion = region ? winesByRegion[region.toLocaleLowerCase()] : wines;
  const winesWithType = type ? winesByType[type.toLocaleLowerCase()] : wines;

  if (!winesWithRegion || !winesWithType) {
    res.sendStatus(404);
  } else {
    res.send(_(winesWithRegion)
             .intersectionBy(winesWithType, 'id')
             .filter( wine => !rated || wine.rating));
  }
} );

router.get('/random', (req, res, next) => {
  let randomIndex = parseInt((Math.random() * wines.length));
  const randomWine = wines[randomIndex];
  res.send([randomWine]);
});

router.get('/:id', (req, res, next) => {
  const wine = winesById[req.params.id];
  if (!wine) {
    res.sendStatus(404);
  } else {
    res.send([wine]);
  }
});

router.post('/:id', validate(validation), (req, res, next) => {
  const wine = winesById[req.body.id];
  if (wine) {
    res.sendStatus(409);
  } else {
    wines.push(req.body);
    // Pas de destructuring correct avant Node 6.0 (bug v8)
    const newMaps = updateMaps(wines);
    winesById = newMaps.winesById;
    winesByRegion = newMaps.winesByRegion;
    winesByType = newMaps.winesByType;
    res.sendStatus(201);
  }
});

router.put('/:id', validate(validation), (req, res, next) => {
  const wine = winesById[req.params.id];
  const newWine = req.body;
  if (!wine) {
    res.sendStatus(404);
    //TODO: id autre mais existant
  } else if (!newWine || !newWine.id || !newWine.appellation) {
    res.sendStatus(400);
  } else {
    _.chain(wines).find({id: wine.id}).extend(newWine).value();
    // Pas de destructuring correct avant Node 6.0 (bug v8)
    // { winesById, winesByRegion, winesByType } = updateMaps(wines);
    const newMaps = updateMaps(wines);
    winesById = newMaps.winesById;
    winesByRegion = newMaps.winesByRegion;
    winesByType = newMaps.winesByType;
    res.sendStatus(204);
  }
});

router.delete('/:id', (req, res, next) => {
  const wine = winesById[req.params.id];
  if (!wine) {
    res.sendStatus(404);
  } else {
    _.remove(wines, (wine) => wine.id === req.params.id);
    // Pas de destructuring correct avant Node 6.0 (bug v8)
    // { winesById, winesByRegion, winesByType } = updateMaps(wines);
    const newMaps = updateMaps(wines);
    winesById = newMaps.winesById;
    winesByRegion = newMaps.winesByRegion;
    winesByType = newMaps.winesByType;
    res.sendStatus(204);
  }
});

router.get('/:id/image', (req, res, next) => {
  const id = req.params.id;
  const imgPath = `public/images/${id}.png`;
  fs.stat(imgPath, err => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendFile(`${id}.png`, {root: path.join(__dirname, '../public/images')});
    }
  });
});

router.get('/:id/comment', (req, res, next) => {
  const wine = winesById[req.params.id];
  if (!wine) {
    res.sendStatus(404);
  } else {
    res.send(wine.comment);
  }
});

router.get('/:id/rating', (req, res, next) => {
  const wine = winesById[req.params.id];
  if (!wine) {
    res.sendStatus(404);
  } else {
    res.send(wine.rating);
  }
});

module.exports = router;
