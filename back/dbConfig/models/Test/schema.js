const { Schema } = require('mongoose');

const test = new Schema({
    counter: {
        type: Number,
        default: 0,
    },
    staticId: {
        type: String,
        default: 'some-test-string'
    }

})

module.exports = { 
    'Test': test 
}
