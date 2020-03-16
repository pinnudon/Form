const express=require('express');
const path=require('path');
const mongoose=require('mongoose')
var bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/form',{
    useNewUrlParser:true
});
var db=mongoose.connection;

db.once('open',()=>{
    console.log('connected to mongodb');
})

db.on('error',(err)=>{
    console.log(err);
})

const app=express();

let articleSchema=mongoose.Schema({
    enroll:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    cont:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    comp:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    }

});
var Article=module.exports=mongoose.model('Forms',articleSchema);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/form',(req,res)=>{
    res.render('form');
})
app.get('/',(req,res)=>{
    res.render('sub');
})
app.post('/form',(req,res)=>{
    let article=new Article();
    article.enroll=req.body.enroll;
    article.name=req.body.name;
    article.cont=req.body.cont;
    article.email=req.body.email;
    article.dob=req.body.dob;
    article.place=req.body.place;
    article.comp=req.body.comp;
    article.course=req.body.course;

    article.save((err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    });
    console.log('submitted');
    
});


app.listen(3000,()=>{
    console.log('listening to port 3000');
})