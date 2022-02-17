// Importing modules
var express = require('express');
const res = require('express/lib/response');
const router = express.Router()
let path = require('path')

//--DB Models--//
let CodeModel = require("../models/code");


//-- Routes -- //

router.get('/', (req, res) => {
    // res.render('home')
    CodeModel.find()
    .sort({_id:-1})
    .then((records) => {

     // console.log(records);
      res.render('home', {'records': records });
    })
    .catch(err => {
      console.log(err);
      res.redirect('/error');
    });
})

router.get("/form", (req, res) => {
    res.render('form')
})

router.get('/code/:id', async(req, res) => {
    
    let id = req.params.id;

    try {
        const r1 = await CodeModel.findById(id)
        //console.log(r1);
        res.render('code',{'record':r1});
    } catch (error) {
        console.log("Error");
        res.redirect('/error');
    }

})

router.post("/form", (req, res) => {

    let title = req.body.title;
    let code = req.body.code;

    // console.log(req.body);
    let a1 = new CodeModel({
        title: title,
        code:code
    })

    a1.save(err => {
        if (err) {
            //console.log(err);
            //res.send("Error");
            res.redirect('/error');
        }
        else {
            res.redirect('/');
            //res.send({title,code});
        }
    });   
})

router.get('/delete/:id', (req, res) => {
   
    let id = req.params.id;
    CodeModel.findByIdAndDelete(id)
      .then(records => {
        res.redirect('/');
      })
      .catch(err => {
        res.redirect('/error');
      });
  });

module.exports = router;
