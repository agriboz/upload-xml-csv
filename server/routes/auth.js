import { Router } from 'express'
import User from '../model/User.js'
import bcrypt from 'bcrypt'
import { registerValidation, loginValidation } from '../utils/validation.js'

const router = Router()

router.post('/register', async (req, res) => {
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const emailExist = await User.findOne({ email: req.body.email})
  if (emailExist) return res.status(400).send('Email already exists')

  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt) 

  const user = User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  })

  try {
    const savedUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

router.post('/login', async (req, res) => {
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email or password is wrong')

  const validPass = await bcrypt.compare(req.body.password, user.password)
  if(!validPass) return res.status(400).send('Invalid password')
  res.send('logged in')
})

export default router