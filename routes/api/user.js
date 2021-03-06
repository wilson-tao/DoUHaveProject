const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const User = require('../../models/User');

router.post('/signup', (req, res, next) => {
  User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: 'Email Exists'
          });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                return res.status(500).json({
                  error: err,
                  message: err
                });
              } else {
                const user = new User({
                  _id: new mongoose.Types.ObjectId(),
                  email: req.body.email,
                  password: hash,
                  firstName: req.body.firstName,
                  lastName: req.body.lastName
                });
                user.save()
                    .then(result => {
                      console.log(result);
                      res.status(201).json({
                        message: 'User Created'
                      });
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(500).json({
                        error: err,
                        message: err
                      });
                    });
                }
            })
          }
      })
  });

router.post('/login', (req, res, next) => {
  User.find({ email: req.body.email})
      .exec()
      .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: 'Auth Failed 1'
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: 'Auth Failed 2'
            });
          }
          if (result) {
            console.log('Environment:', process.env.JWT_KEY);
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: 'Auth Successful',
              token: token,
              userName: user[0].userName,
              firstName: user[0].firstName
            });
          }
          res.status(401).json({
            message: 'Auth Failed 3'
          });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          message: err
        });
      });
});

router.get('/user/:userId', checkAuth, (req,res,next) => {
  User.findById({_id: req.params.userId})
      .exec()
      .then(result => {
        if (req.params.userId != req.userData.userId) {
          return res.status(401).json({
            message: 'Auth Failed 5'
          });
        } else {
          return res.status(200).json({
            message: 'User GET',
            userName: result.userName,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            streetAddress: result.streetAddress,
            city: result.city,
            state: result.state,
            zip: result.zip
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})

router.delete('/:userId', checkAuth, (req, res, next) => {
  if (req.params.userId != req.userData.userId) {
    return res.status(401).json({
      message: 'Auth Failed 5'
    });
  } else {
    User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
          if (req.params.userId != req.userData.userId) {
            return res.status(401).json({
              message: 'Auth Failed 5'
            });
          } else {
            res.status(200).json({
              message: 'User Deleted'
            });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        })
  }
});

router.patch('/edit/:userId', checkAuth, (req, res, next) => {
  if (req.params.userId != req.userData.userId) {
    return res.status(401).json({
      message: 'Auth Failed 5'
    });
  } else {
    User.update({_id: req.params.userId}, {$set: {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }})
        .exec()
        .then(result => {
          res.status(200).json({
            message: 'User Updated!',
            request: {
              type: 'PATCH',
              url: '/user/' + req.params.userId
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
});

//Verify user
router.get('/verify/:token', (req, res, next) => {
  const token = req.params.token;
  if (!token) {
    return res.status(401).json({message: 'Must Pass Token'});
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: 'Auth Failed 51'
      });
    }
    User.findById({_id: user.userId})
        .exec()
        .then(result => {
          console.log('Verifying');
          console.log(result);
          return res.status(200).json({
            message: 'User Verified',
            user: user,
            token: token,
            userName: result.userName,
            firstName: result.firstName,
            userId: result._id,
            email: result.email,
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
  });

})

module.exports = router;
