const bcrypt = require("bcrypt");
const joi = require("joi");
const express = require("express");

const getAuthToken = require("../utils/genAuthToken");
const userModel = require('../models/user')

const router = express.Router();


router.post('/' , async (req , res)=> {
    const schema = joi.object({
        email: joi.string().min(3).max(200).required().email(),
        password: joi.string().min(3).max(200).required(),
      });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await userModel.findOne({ email: req.body.email });
      if (!user) return res.status(400).send("Invalid email or password....");

     const isValid =  await bcrypt.compare(req.body.password , user.password )
     if (!isValid) return res.status(400).send("Invalid email or password....");

      const token = getAuthToken(user)
      return  res.send(token)
})

module.exports  = router