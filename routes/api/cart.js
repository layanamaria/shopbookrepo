const express = require('express');
const router = express.Router();

const Book = require('../../models/Book');
const Cart = require('../../models/Cart');


router.get('/test', (req, res) => res.send('cart route testing!'));

router.get('/:id', async (req,res)  => {
    const userId = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.books.length>0){
            res.send(cart);
        }
        else{
        res.send(null);
        }
        }
    catch(err){
    console.log(err);
    res.status(500).send("Something went wrong");
        }
});

router.post('/:id', async (req,res)  => {
    const userId = req.params.id;
    const { bookId, quantity } = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let book = await Book.findOne({_id: bookId});
        if(!book){
            res.status(404).send('Book not found!')
        }
        const price = book.price;
        const name = book.title;
        
        if(cart){
            // if cart exists for the user
            let bookIndex = cart.books.findIndex(p => p.bookId == bookId);

            // Check if product exists or not
            if(bookIndex > -1)
            {
                let bookItem = cart.books[bookIndex];
                bookItem.quantity += quantity;
                cart.books[bookIndex] = bookItem;
            }
            else {
                cart.books.push({ bookId, name, quantity, price });
            }
            
            cart.bill+=(quantity*price);
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                books: [{ bookId, name, quantity, price }],
                bill: (quantity*price)
            });
            return res.status(201).send(newCart);
           
        } 
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});


router.delete('/:id/:bookId',async (req,res) => {
    const userId = req.params.id;
    const bookId = req.params.bookId;
    try{
        let cart = await Cart.findOne({userId});
        let bookIndex = cart.books.findIndex(p => p.bookId == bookId);
        if(bookIndex > -1)
        {
            let bookItem = cart.books[bookIndex];
            cart.bill -= bookItem.quantity*bookItem.price;
            cart.books.splice(bookIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});



module.exports = router;


    
