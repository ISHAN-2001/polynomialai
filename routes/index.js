// Importing modules
var express = require('express')
const router = express.Router()
let path = require('path')


//-- Routes -- //

router.get('/', (req, res) => {
    res.render('home')
})

router.get("/form", (req, res) => {
    res.render('form')
})

router.get('/code/:id', (req, res) => {
    
    let id = req.params.id;
    res.send(`${id} code page is working`)
})

module.exports = router;