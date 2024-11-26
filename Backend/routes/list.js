const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");
const list = require("../models/list");
const { resolve } = require("path/posix");

//Create New Todo Item

router.post("/todos", async (req,res) => {
    try {
        const {title, body, email} = req.body 
        const existinguser = await User.findOne({email})
        if(existinguser){
            const list = new List({title, body, user : existinguser})
            await list.save().then(() => res.status(200).json({list}))
            existinguser.list.push(list);
            existinguser.save()
        }
    } catch (error) {
        console.log(error)
    }
})

// Update existing Todo Item

router.put("/todos/:id", async (req,res) => {
    try {
        const {title, body, email} = req.body 
        const existinguser = await User.findOne({email})
        if(existinguser){
            const list = await List.findByIdAndUpdate(req.params.id, {title, body})
            list.save().then(() => res.status(200).json({message : "Todo Updated"}))
        }
    } catch (error) {
        console.log(error)
    }
})

// delete todo item

router.delete("/todos/", async (req,res) => {
    try {
        const { email } = req.body 
        const existinguser = await User.findOneAndUpdate({email}, {$pull: {list: req.params.id}})
        if(existinguser){
            await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({message : "Todo Deleted"}))
        }
    } catch (error) {
        console.log(error)
    }
})

// get Todos

router.get("/todos/:id", async (req,res) => {
    const list = await List.find({user : req.params.id})
    if(list.length !== 0){
        res.status(200).json({list : list})
    }else{
        res.status(200).json({message: "No Tasks Present"})
    }
})


module.exports = router;