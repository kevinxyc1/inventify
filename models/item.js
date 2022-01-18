const mongoose = require('mongoose')
const path = require('path')

const coverImageBasePath = 'uploads/itemCovers'

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    count: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    },
    coverImageName: {
        type: String,
        required: true
    }
})

itemSchema.virtual('coverImagePath').get(function() {
    if(this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('Item', itemSchema)
module.exports.coverImageBasePath = coverImageBasePath