const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Item = require('../../models/Item');

/*
router.get('/', (req, res, next) => {
  res.status(200).json({message: 'It Works'});
})
*/

router.get('/', (req, res, next) => {
  Item.find()
      .select('name _id pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              name: doc.name,
              pic: doc.pic,
              budget: doc.budget,
              _id: doc._id,
              category: doc.category,
              condition: doc.condition,
              description: doc.description,
              location: doc.location,
              locationState: doc.locationState,
              submittedby: doc.submittedby,
              submittedby1: doc.submittedby1,
              carmake: doc.carmake,
              carmodel: doc.carmodel,
              caryear: doc.caryear,
              cellmake: doc.cellmake,
              cellmodel: doc.cellmodel,
              cellcarrier: doc.cellcarrier,
              cellos: doc.cellos,
              gamesystem: doc.gamesystem,
              createdAt: doc.createdAt,
              expirationDate: doc.expirationDate,
              request: {
                type: 'GET',
                url: '/items/' + doc._id
              }
            }
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

// Category Routes

router.get('/:category', (req, res, next) => {
  Item.find({ category: req.params.category })
      .select('name _id pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              name: doc.name,
              budget: doc.budget,
              pic: doc.pic,
              _id: doc._id,
              category: doc.category,
              condition: doc.condition,
              description: doc.description,
              location: doc.location,
              locationState: doc.locationState,
              submittedby: doc.submittedby,
              submittedby1: doc.submittedby1,
              carmake: doc.carmake,
              carmodel: doc.carmodel,
              caryear: doc.caryear,
              cellmake: doc.cellmake,
              cellmodel: doc.cellmodel,
              cellcarrier: doc.cellcarrier,
              cellos: doc.cellos,
              gamesystem: doc.gamesystem,
              createdAt: doc.createdAt,
              expirationDate: doc.expirationDate,
              request: {
                type: 'GET',
                url: '/items/' + doc._id
              }
            }
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

// End Category Routes

// Search Route: Category AND Name
router.get('/search1/:category/:term', (req, res, next) => {
  const regex = RegExp(req.params.term, 'i');
  Item.find({ category: req.params.category, name: regex })
      .select('name _id pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              name: doc.name,
              pic: doc.pic,
              budget: doc.budget,
              _id: doc._id,
              category: doc.category,
              condition: doc.condition,
              description: doc.description,
              location: doc.location,
              locationState: doc.locationState,
              submittedby: doc.submittedby,
              submittedby1: doc.submittedby1,
              carmake: doc.carmake,
              carmodel: doc.carmodel,
              caryear: doc.caryear,
              cellmake: doc.cellmake,
              cellmodel: doc.cellmodel,
              cellcarrier: doc.cellcarrier,
              cellos: doc.cellos,
              gamesystem: doc.gamesystem,
              createdAt: doc.createdAt,
              expirationDate: doc.expirationDate,
              request: {
                type: 'GET',
                url: '/items/' + doc._id
              }
            }
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

//General Search: Name OR Description
  router.get('/search2/:term', (req, res, next) => {
    const regex = RegExp(req.params.term, 'i');
    Item.find({$or :[{name: regex},{description: regex}]})
        .select('name _id pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            items: docs.map(doc => {
              return {
                name: doc.name,
                budget: doc.budget,
                pic: doc.pic,
                _id: doc._id,
                category: doc.category,
                condition: doc.condition,
                description: doc.description,
                location: doc.location,
                locationState: doc.locationState,
                submittedby: doc.submittedby,
                submittedby1: doc.submittedby1,
                carmake: doc.carmake,
                carmodel: doc.carmodel,
                caryear: doc.caryear,
                cellmake: doc.cellmake,
                cellmodel: doc.cellmodel,
                cellcarrier: doc.cellcarrier,
                cellos: doc.cellos,
                gamesystem: doc.gamesystem,
                createdAt: doc.createdAt,
                expirationDate: doc.expirationDate,
                request: {
                  type: 'GET',
                  url: '/items/' + doc._id
                }
              }
            })
          };
          res.status(200).json(response);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  });

//General Advanced Search: Category AND Condition AND Name OR Description
  router.get('/search3/:category/:condition/:term', (req, res, next) => {
    const regex = RegExp(req.params.term, 'i');
    Item.find({ category: req.params.category, condition: req.params.condition, $or :[{name: regex},{description: regex}]})
        .select('name _id pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            items: docs.map(doc => {
              return {
                name: doc.name,
                budget: doc.budget,
                pic: doc.pic,
                _id: doc._id,
                category: doc.category,
                condition: doc.condition,
                description: doc.description,
                location: doc.location,
                locationState: doc.locationState,
                submittedby: doc.submittedby,
                submittedby1: doc.submittedby1,
                carmake: doc.carmake,
                carmodel: doc.carmodel,
                caryear: doc.caryear,
                cellmake: doc.cellmake,
                cellmodel: doc.cellmodel,
                cellcarrier: doc.cellcarrier,
                cellos: doc.cellos,
                gamesystem: doc.gamesystem,
                createdAt: doc.createdAt,
                expirationDate: doc.expirationDate,
                request: {
                  type: 'GET',
                  url: '/items/' + doc._id
                }
              }
            })
          };
          res.status(200).json(response);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  });

// End Search Route

router.post('/', (req, res, next) => {
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    budget: req.body.budget,
    category: req.body.category,
    condition: req.body.condition,
    description: req.body.description,
    location: req.body.location,
    submittedby: req.body.submittedby,
    submittedby1: req.body.submittedby1,
    carmake: req.body.carmake,
    carmodel: req.body.carmodel,
    caryear: req.body.caryear,
    cellcarrier: req.body.cellcarrier,
    cellmodel: req.body.cellmodel,
    cellmake: req.body.cellmake,
    cellos: req.body.cellos,
    gamesystem: req.body.gamesystem
  });
  item.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Item created in /items',
          createdItem: {
            name: result.name,
            budget: result.budget,
            _id: result._id,
            category: result.category,
            condition: result.condition,
            description: result.description,
            location: result.location,
            submittedby: result.submittedby,
            submittedby1: result.submittedby1,
            carmake: result.carmake,
            carmodel: result.carmodel,
            caryear: result.caryear,
            cellmake: result.cellmake,
            cellmodel: result.cellmodel,
            cellcarrier: result.cellcarrier,
            cellos: result.cellos,
            gamesystem: result.gamesystem,
            createdAt: result.createdAt,
            expirationDate: result.expirationDate,
            request: {
              type: 'POST',
              url: '/items/' + result._id
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        })
      });
});

router.get('/item/:itemId', (req, res, next) => {
  console.log('Get Works');
  const id = req.params.itemId;
  Item.findById(id)
      .select('name _id pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate')
      .exec()
      .then(doc => {
        console.log("From Database", doc);
        if (doc) {
          res.status(200).json({
            item: doc,
            request: {
              type: 'GET',
              description: 'Getting individual item',
              url: '/items/' + doc._id
            }
          });
        } else {
          res.status(404).json({message: 'No Valid Entry Found'});
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
      });
});

router.patch('/item/:itemId', (req, res, next) => {
  const id = req.params.itemId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Item.update({_id: id}, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Item updated!',
          request: {
            type: 'PATCH',
            url: '/items/' + id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.delete('/item/:itemId', (req, res, next) => {
  const id = req.params.itemId;
  Item.remove({_id: id})
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Item Deleted!',
          request: {
            type: 'DELETE',
            url: '/items/',
            data: { name: 'String', price: 'Number'}
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});


module.exports = router;
