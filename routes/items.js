const express = require('express')
const router = express.Router()
const Item = require('../models/item')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']

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
router.post('/', async (req, res) => {
    const item = new Item({
        name: req.body.name,
        dateAdded: new Date(req.body.dateAdded),
        count: req.body.count,
        description: req.body.description
    })
    saveCover(item, req.body.cover)

    try {
        const newItem = await item.save()
        res.redirect('items')
    } catch {
        renderNewPage(res, item, true)
    }
})

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

function saveCover(item, coverEncoded){
    if(coverEncoded == null) {
        return
    }
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        item.coverImage = new Buffer.from(cover.data, 'base64')
        item.coverImageType = cover.type
    }
}

module.exports = router