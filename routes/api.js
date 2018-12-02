const express = require('express');
const router = express.Router();
const { Registration } = require('../models/registrationSchema');

router.post('/signin',function(req,res) {
    Registration.findOne({email:req.body.email,password:req.body.password}).then(function(user) {
        if(user) {
            res.send({userData:{auth:true,user}})
        } else {
            res.send({error:"Incorrect email or password"})
        }
    }).catch(() => res.send({error:"Error on the server"}));
})

router.post('/signup',function(req,res) {
    Registration.findOne({email:req.body.email}).then(function(user) {
        if(user) {
            res.send({error:"This email address is already use"})
        } else {
            Registration.create({email:req.body.email,password:req.body.password}).then(function(user) {
                if(user) {
                    res.send({userData:{auth:true,user}})
                }
            }).catch(() => res.send({error:"Error on the server"}));
        }
    }).catch(() => res.send({error:"Error on the server"}));
})



module.exports = router;