const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Savelist = require('../../models/Savelist');
const Item = require('../../models/Item');

router.get('/', checkAuth, (req, res, next) => {
  Savelist.find()
          .select('item quantity _id')
          .exec()
          .then(docs => {
            res.status(200).json({
              count: docs.length,
              items: docs.map(doc => {
                return {
                  _id: doc._id,
                  item: doc.item,
                  quantity: doc.quantity,
                  request: {
                    type: 'GET',
                    url: '/savelist/' + doc._id
                  }
                }
              })
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            })
          });
});

router.post('/', checkAuth, (req, res, next) => {
  Item.findById(req.body.itemId)
      .then(item => {
        if (!item) {
          return res.status(404).json({
            message: 'Product not found'
          });
        }
        const savelist = new Savelist({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          item: req.body.itemId
        });
        return savelist.save()
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'List Saved',
          createdSavelist: {
            _id: result._id,
            item: result.item,
            quantity: result.quantity
          },
          request: {
            type: 'POST',
            url: '/savelist/' + result._id
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

router.get('/:savelistId', checkAuth, (req, res, next) => {
  Savelist.findById(req.params.savelistId)
      .exec()
      .then(savelist => {
        if (!savelist) {
          return res.status(404).json({
            message: 'List not found'
          });
        }
        res.status(200).json({
          savelist: savelist,
          request: {
            type: 'GET',
            url: '/savelist/' + savelist._id
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
});

router.patch('/:savelistId', checkAuth, (req, res, next) => {
  res.status(200).json({
    message: 'Updated SaveList!'
  })
});

router.delete('/:savelistId', checkAuth, (req, res, next) => {
  Savelist.remove({ _id: req.params.savelistId })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'List Deleted',
          request: {
            type: 'DELETE',
            url: '/savelist/',
            body: { itemId: 'ID', quantity: 'Number'}
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
});

module.exports = router;
