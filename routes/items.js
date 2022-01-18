const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const Item = require('../models/item')
const uploadPath = path.join('public', Item.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    } 
})

// All Items Route
router.get('/', async (req, res) => {
    let query = Item.find()
    if (req.query.name != null && req.query.name != '') {
        query = query.regex('name', new RegExp(req.query.name, 'i'))
    }
    if (req.query.dateAddedBefore != null && req.query.dateAddedBefore != '') {
        query = query.lte('dateAdded', req.query.dateAddedBefore)
    }
    if (req.query.dateAddedAfter != null && req.query.dateAddedAfter != '') {
        query = query.gte('dateAdded', req.query.dateAddedAfter)
    }
    try {
        const items = await query.exec()
        res.render('items/index', {
            items: items,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
    
})

// New Item Route
router.get('/new', (req, res) => {
    renderNewPage(res, new Item())
})

// Create Item Route
router.post('/', upload.single('cover'), async (req, res) => {
    const fileName = req.file != null ? req.file.filename : null
    const item = new Item({
        name: req.body.name,
        dateAdded: new Date(req.body.dateAdded),
        count: req.body.count,
        coverImageName: fileName,
        description: req.body.description
    })

    try {
        const newItem = await item.save()
        res.redirect('items')
    } catch {
        if (item.coverImageName != null){
            removeItemCover(item.coverImageName)
        }
        renderNewPage(res, item, true)
    }
})

function removeItemCover(fileName) {
    fs.unlink(path.join(uploadPath, fileName), err => {
        if(err) {
            console.error(err);
        }
    })
}

async function renderNewPage(res, item, hasError = false) {
    try {
        const item = new Item()
        const params = {item: item}
        if (hasError) params.errorMessage = 'Error Creating Item'
        res.render('items/new', params)
    } catch {
        res.redirect('items')
    }
}

module.exports = router