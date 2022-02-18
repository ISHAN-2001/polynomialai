// Importing modules
var express = require('express');
const res = require('express/lib/response');
const router = express.Router()
let path = require('path')
var shortUrl = require('node-url-shortener');

//--DB Models--//
let CodeModel = require("../models/code");

var flag = 0;

async function checkrecords() {
    if (flag == 1) {
        return;
    }
    try {
        date = Date.now();
        const record = await CodeModel.find()
        record.forEach(item => {
            
            if (date - item.created > 24 * 60 * 60 * 1000) {
                //delete the record
                CodeModel.findByIdAndDelete(item._id)
                    .then(a => {
                        flag = 1;
                    })
                    .catch(err=>{
                    console.log(err);
                })

            }
        })
    } catch (error) {
        console.log("Error")
    }
}

//-- Routes -- //
router.get('/', (req, res) => {
    // res.render('home')
    checkrecords();
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
    let url = `https://whispering-shore-06308.herokuapp.com/code/${id}`;
    let shorturl = "";

    try {
        const r1 = await CodeModel.findById(id)
        //console.log(r1);
        console.log(r1);
        shortUrl.short(url, function(err, url){
            //console.log(url);
            //console.log("Inside func")
            shorturl = url;
            console.log(shorturl);
            res.render('code', { 'record': r1,'shortUrl':shorturl});
        });
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
