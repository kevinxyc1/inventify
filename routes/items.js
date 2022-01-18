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
        res.redirect(`items/${newItem.id}`)
    } catch {
        renderNewPage(res, item, true)
    }
})

// Show Item Route
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        res.render('items/show', {item: item})
    } catch {
        res.redirect('/')
    }
})

// Edit Item Route
router.get('/:id/edit', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id)
        renderEditPage(res, item)
    } catch {
        res.redirect('/')
    }
    
})

// Update Item Route
router.put('/:id', async (req, res) => {
    let item

    try {
        item = await Item.findById(req.params.id)
        item.name = req.body.name
        item.dateAdded = new Date(req.body.dateAdded)
        item.count = req.body.count
        item.description = req.body.description
        if (req.body.cover != null && req.body.cover !== ''){
            saveCover(item, req.body.cover)
        }
        await item.save()
        res.redirect(`/items/${item.id}`)
    } catch {
        if (item != null) {
            renderEditPage(res, item, true)
        } else {
            res.redirect('/')
        }
    }
})

router.delete('/:id', async (req, res) => {
    let item
    try {
        item = await Item.findById(req.params.id)
        await item.remove()
        res.redirect('/items')
    } catch {
        if (item != null) {
            res.render('items/show', {
                item: item,
                errorMessage: 'Could not remove item'
            })
        } else {
            res.redirect('/')
        }
    }
})

async function renderNewPage(res, item, hasError = false) {
    renderFormPage(res, item, 'new', hasError)
}

async function renderEditPage(res, item, hasError = false) {
    renderFormPage(res, item, 'edit', hasError)
}

async function renderFormPage(res, item, form, hasError = false) {
    try {
        const params = {item: item}
        if (hasError) {
            if (form === "edit") {
                params.errorMessage = 'Error Updating Item'
            } else {
                params.errorMessage = 'Error Creating Item'
            }
        }
        res.render(`items/${form}`, params)
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