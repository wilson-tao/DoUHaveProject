const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/build/uploads/itempics/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
     cb(null, true);
   } else {
     cb(null, false);
   }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2024 * 2024 * 5
  },
  fileFilter: fileFilter
});


const Item = require('../../models/Item');

/*
router.get('/', (req, res, next) => {
  res.status(200).json({message: 'It Works'});
})
*/

//Get all items
router.get('/', (req, res, next) => {
  Item.find()
      .select('name _id itemImg pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate contactinfo')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              name: doc.name,
              itemImg: doc.itemImg,
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
              contactinfo: doc.contactinfo,
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
      .select('name _id itemImg pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate contactinfo')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              name: doc.name,
              budget: doc.budget,
              itemImg: doc.itemImg,
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
              contactinfo: doc.contactinfo,
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

//GET All Items posted by User
router.get('/user/:userId', (req, res, next) => {
  Item.find({submittedby1: req.params.userId})
      .select('name _id itemImg pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate contactinfo')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              name: doc.name,
              budget: doc.budget,
              itemImg: doc.itemImg,
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
              contactinfo: doc.contactinfo,
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
      .select('name _id itemImg pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate contactinfo')
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          items: docs.map(doc => {
            return {
              name: doc.name,
              itemImg: doc.itemImg,
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
              contactinfo: doc.contactinfo,
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
        .select('name _id itemImg pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate contactinfo')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            items: docs.map(doc => {
              return {
                name: doc.name,
                itemImg: doc.itemImg,
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
                contactinfo: doc.contactinfo,
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
        .select('name _id itemImg pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate contactinfo')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            items: docs.map(doc => {
              return {
                name: doc.name,
                itemImg: doc.itemImg,
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
                contactinfo: doc.contactinfo,
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

router.post('/', checkAuth, upload.single('itemImg'), (req, res, next) => {
  if (req.body.submittedby1 != req.userData.userId) {
    return res.status(401).json({
      message: 'Auth Failed 5'
    });
  } else {
    console.log('ReqFile: ', req.file);
    const item = new Item({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      itemImg: req.file.path,
      budget: req.body.budget,
      category: req.body.category,
      condition: req.body.condition,
      description: req.body.description,
      location: req.body.location,
      locationState: req.body.locationState,
      submittedby: req.body.submittedby,
      submittedby1: req.body.submittedby1,
      carmake: req.body.carmake,
      carmodel: req.body.carmodel,
      caryear: req.body.caryear,
      cellcarrier: req.body.cellcarrier,
      cellmodel: req.body.cellmodel,
      cellmake: req.body.cellmake,
      cellos: req.body.cellos,
      gamesystem: req.body.gamesystem,
      contactinfo: req.body.contactinfo
    });
    item.save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Item created in /items',
            createdItem: {
              name: result.name,
              itemImg: result.itemImg,
              budget: result.budget,
              _id: result._id,
              category: result.category,
              condition: result.condition,
              description: result.description,
              location: result.location,
              locationState: result.locationState,
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
              contactinfo: result.contactinfo,
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
  }

});

/*
router.post('/nopic', upload.none(), (req, res, next) => {
  console.log('ReqFile: ', req.file);
  const item = new Item({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    budget: req.body.budget,
    category: req.body.category,
    condition: req.body.condition,
    description: req.body.description,
    location: req.body.location,
    locationState: req.body.locationState,
    submittedby: req.body.submittedby,
    submittedby1: req.body.submittedby1,
    carmake: req.body.carmake,
    carmodel: req.body.carmodel,
    caryear: req.body.caryear,
    cellcarrier: req.body.cellcarrier,
    cellmodel: req.body.cellmodel,
    cellmake: req.body.cellmake,
    cellos: req.body.cellos,
    gamesystem: req.body.gamesystem,
    contactinfo: req.body.contactinfo
  });
  item.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Item created in /items',
          createdItem: {
            name: result.name,
            itemImg: result.itemImg,
            budget: result.budget,
            _id: result._id,
            category: result.category,
            condition: result.condition,
            description: result.description,
            location: result.location,
            locationState: result.locationState,
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
            contactinfo: result.contactinfo,
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
*/

router.get('/item/:itemId', (req, res, next) => {
  console.log('Get Works');
  const id = req.params.itemId;
  Item.findById(id)
      .select('name _id itemImg pic budget category condition description location locationState submittedby carmake carmodel caryear cellmake cellmodel cellcarrier cellos gamesystem createdAt expirationDate contactinfo')
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

//EDIT ITEM
router.patch('/item/edit/:itemId', checkAuth, (req, res, next) => {
  const id = req.params.itemId;
  Item.findById(id)
      .select('submittedby1')
      .exec()
      .then(result => {
        if (result.submittedby1 != req.userData.userId) {
          return res.status(401).json({
            message: 'Auth Failed 5'
          });
        } else {

          Item.update({_id: id}, { $set: {
            name: req.body.name
          }})
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
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});

router.delete('/item/:itemId', checkAuth, (req, res, next) => {
  const id = req.params.itemId;
  Item.findById(id)
      .select('submittedby1')
      .exec()
      .then(result => {
        if (result.submittedby1 != req.userData.userId) {
          return res.status(401).json({
            message: 'Auth Failed 5'
          });
        } else {
          Item.remove({_id: id})
              .exec()
              .then(result => {
                res.status(200).json({
                  message: 'Item Deleted!',
                  request: {
                    type: 'DELETE',
                    url: '/items/'
                  }
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });

});


module.exports = router;
