const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

const Offer = require('../../models/Offer');

//Route to get All Offers for Item
router.get('/item/:itemId', checkAuth, (req, res, next) => {
  Offer.find({ itemId: req.params.itemId })
        .select('_id itemId itemOwner submittedAt myOffer submittedBy contactPhone contactEmail offerMessage accepted messageBack')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            items: docs.map(doc => {
              return {
                _id: doc._id,
                itemId: doc.itemId,
                itemOwner: doc.itemOwner,
                submittedAt: doc.submittedAt,
                myOffer: doc.myOffer,
                submittedBy: doc.submittedBy,
                contactPhone: doc.contactPhone,
                contactEmail: doc.contactEmail,
                offerMessage: doc.offerMassage,
                accepted: doc.accepted,
                messageBack: doc.messageBack,
                request: {
                  type: 'GET',
                  url: '/offers/item/' + doc.itemId
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

//Route to get Offers of all Items posted by User who Posted Item
router.get('/itemowner/:userId', checkAuth, (req, res, next) => {
  Offer.find({ itemOwner: req.params.userId })
        .select('_id itemId itemOwner submittedAt myOffer submittedBy contactPhone contactEmail offerMessage accepted messageBack')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            items: docs.map(doc => {
              return {
                _id: doc._id,
                itemId: doc.itemId,
                itemOwner: doc.itemOwner,
                submittedAt: doc.submittedAt,
                myOffer: doc.myOffer,
                submittedBy: doc.submittedBy,
                contactPhone: doc.contactPhone,
                contactEmail: doc.contactEmail,
                offerMessage: doc.offerMassage,
                accepted: doc.accepted,
                messageBack: doc.messageBack,
                request: {
                  type: 'GET',
                  url: '/offers/itemowner/' + doc.itemOwner
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

//Route to get All Offers by User who submitted them on single Item???
//Better: Check if User has already put offer on item
router.get('/check/:itemId/:userId', checkAuth, (req, res, next) => {
  Offer.find({ itemId: req.params.itemId, submittedBy: req.params.userId})
      .select('_id itemId submittedBy')
      .exec()
      .then(docs => {
        if (docs.length === 0) {
          res.status(200).json("False");
        } else {
          res.status(200).json("True");
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});


//Route to get Offers User submitted on all items
router.get('/myoffers/:userId', checkAuth, (req, res, next) => {
  Offer.find({ submittedBy: req.params.userId })
        .select('_id itemId itemOwner submittedAt myOffer submittedBy contactPhone contactEmail offerMessage accepted messageBack')
        .exec()
        .then(docs => {
          const response = {
            count: docs.length,
            items: docs.map(doc => {
              return {
                _id: doc._id,
                itemId: doc.itemId,
                itemOwner: doc.itemOwner,
                submittedAt: doc.submittedAt,
                myOffer: doc.myOffer,
                submittedBy: doc.submittedBy,
                contactPhone: doc.contactPhone,
                contactEmail: doc.contactEmail,
                offerMessage: doc.offerMassage,
                accepted: doc.accepted,
                messageBack: doc.messageBack,
                request: {
                  type: 'GET',
                  url: '/offers/myoffers/' + doc.submittedBy
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



//Route to post Offer on Item
router.post('/', checkAuth, (req, res, next) => {
  const offer = new Offer({
    _id: new mongoose.Types.ObjectId(),
    itemId: req.body.itemId,
    itemOwner: req.body.itemOwner,
    myOffer: req.body.myOffer,
    submittedBy: req.body.submittedBy,
    contactPhone: req.body.contactPhone,
    contactEmail: req.body.contactEmail,
    offerMessage: req.body.offerMessage
  });
  offer.save()
      .then(result => {
        res.status(201).json({
          message: 'Offer Sent',
          createdItem: {
            itemId: result.itemId,
            myOffer: result.myOffer,
            submittedBy: result.submittedBy,
            contactPhone: result.contactPhone,
            contactEmail: result.contactEmail,
            offerMessage: result.offerMessage,
            request: {
              type: 'POST',
              url: '/offers/' + result._id
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

//Route to post Message Back to Offerer, or make changes to offer
router.patch('/offer/:offerId', checkAuth, (req, res, next) => {
  const id = req.params.offerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Offer.update({_id: id}, { $set: updateOps })
       .exec()
       .then(result => {
         res.status(200).json({
           message: 'Item updated',
           request: {
             type: 'PATCH',
             url: '/offers/offer/' + id
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


//Route to Delete Offer
router.delete('/offer/:offerId', checkAuth, (req, res, next) => {
  const id = req.params.offerId;
  Offer.remove({_id: id})
       .exec()
       .then(result => {
         res.status(200).json({
           message: 'Offer Deleted!',
           request: {
             type: 'DELETE',
             url: '/offers/offer'
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
