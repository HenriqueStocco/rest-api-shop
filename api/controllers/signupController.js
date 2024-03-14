import mongoose from 'mongoose'
import User from '../models/userSchema.js'
import { hash } from 'bcrypt'

export function createUser(req, res) {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (!(user.length >= 1)) {
        hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            })

            user.save()
              .then(result => {
                console.log(result)
                res.status(201).json({ message: 'User created' })
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({ error: err })
              })
          }
        })
      } else {
        return res.status(409).json({ message: 'Email exists' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
}

