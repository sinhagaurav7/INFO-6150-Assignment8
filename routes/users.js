const express = require('express');
const User = require('../models/user');

const router = express.Router();

const user = new User({
    fullname: "Gaurav Sinha",
    email: "gauravsinha582@gmail.com",
    password: "Gaurav@123"
});

//user.save();

router.get('/', async(req, res) => {
    try{
        res.send(user);
    }catch(err){
        res.status(500).send(err);
    }
});

router.post('/user/create', async(req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
    
});

router.put('/user/edit', async(req, res) => {
    try{
        const userId = req.body._id;
        console.log(userId);
        const result = await User.replaceOne({_id: userId}, req.body);
        console.log(result);
        res.send({updatedCount: result.modifiedCount});
    }catch(err){
        res.status(500).send(err);
    }
});

router.delete('/user/delete', async(req, res) => {
    try{
        const userId = req.body._id;
        const result = await User.deleteOne({_id: userId}, req.body);
        console.log(result);
        res.send({deletedCount: result.deletedCount});
    }catch(err){
        res.status(500).send(err);
    }
});

router.get('/user/getAll', async(req,res) => {
    try{
        const users = await User.find();
        res.send({"users": users});
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;







/*
try{
    res.json({mssg: 'Hi, I am a user page'});
}catch(err){
    res.status(500).send(err);
}
*/


// const {fullname, email, password} = req.body;

    // try{
    //     const user = new User({fullname, email, password});
    //     await user.save();
    //     res.status(201).send(user);
    // }catch(err){
    //     err.status(400).send(err);
    // }