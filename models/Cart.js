const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const CartSchema = new Schema({
    userId: {
        type: String,
        ref: "user"
    },
    books: [{
        bookId: {
            type: String,
            ref: "book"
        },
        name: String,
        quantity: {
            type: SchemaTypes.Double,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            deafult: 1
        },
        price: {
            type: SchemaTypes.Double,
            required: true
        }
    }],
    bill: {
        type: SchemaTypes.Double,
        required: true,
        default: 0
    }
});

module.exports = Cart = mongoose.model('cart',CartSchema);