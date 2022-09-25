const { Router } = require('express')
const express = require('express')
const  {model }  = require('mongoose')
const router = express.Router()
const user = require('../models/userModel')


router.post('/', (req,res) =>{
    let newperson =user(req.body)
    newperson.save((err,data)=>{
        err ? console.log(err) : res.send('newperson was added')
        })
  
})

// create many people 
var CreateManyPeople=function(arrayOfPeople,done) {
    user.Create( arrayOfPeople,(err,data) => err? console.log(err) : done (null,data))
    
}
router.post('/add', (req,res)=>{
    CreateManyPeople (req.body,(err,data)=>{
        err ? console.log(err) : res.send('created')
    } )
})

//Use model.find() to Search Your Database

router.get('/name',(req,res)=> {
    person.find({name:req.params.name},(err,data)=> { 
        err ?  console.log(err) : res.json(data)
    })
})

// //Use model.findOne() to Find just one person 

router.get('/favoriteFoods',(req,res)=> {
    console.log('get favorite')
    person.findOne({favoriteFoods: {$elemMatch:{$eq:req.params.favoriteFoods}} },(err,data)=> { 
        err ?  console.log(err) : res.json(data)
    })
}) 

//Use model.findById() to Search Your Database By _id

router.get('/getid' , (req,res)=>{
    person.findById({_id:req.params.id},(err,data)=>{
        err? console.log(err) : res.json(data)
    })
})

//Perform Classic Updates by Running Find, Edit, then Save

router.put('/:id',async (req,res)=>{
    
    try{
        var foodToAdd = 'pizza';
        const data=await person.findById(req.params.id)
        data.favoriteFoods=[...data.favoriteFoods,foodToAdd]
        const result= await  data.save()
        res.status(200).json(result)
        }
        catch(err){
            res.status(400).json({error:err})
        }
})

//Perform New Updates on a Document Using model.findOneAndUpdate()

router.put('/update/:name',(req,res)=> {

    var ageToSet = 20;
    person.findOneAndUpdate({name:req.params.name},{$set: {"age":ageToSet}},{returnNewDocument : true}, function(err, doc){
    if(err){return console.log("Something wrong when updating record!");}
    res.json(doc);                  
    })
})  

//Delete One Document Using model.findByIdAndRemove

router.delete('/:id' , (req,res) =>{
    person.findByIdAndDelete({_id:req.params.id},(err,data)=> {
        err? console.log(err) : res.send('person was deleted ')
    })
})

//Delete Many Documents with model.remove()

router.delete('/removeNames/:name',(req,res)=> {
    person.remove({name:req.params.name},(err,data)=> { 
        err ?  console.log(err) : res.send('all persons named mary were deleted')
    })   
})
//Chain Search Query Helpers to Narrow Search Results
router.get('/',(req,res)=> {
    var foodToSearch = "kosksi";
    person.find({favoriteFoods:{$elemMatch:{$eq:foodToSearch }}})
    .sort({name : "desc"})
    .limit(2)
    .select("-age")
    .exec((err, data) => {
        if(err)
        return  console.log(err);
    res.json(data)
    })
})





module.exports = router