var express = require('express');
var router = express.Router();
const { Db } = require('mongodb');

const expressAsyncHandler = require('express-async-handler');

/* GET home page. */
router.get('/get-all', expressAsyncHandler( async (req, res, next) => {

    //get the collection object from app.js
    let Tickets = req.app.get('Tickets');

    //get all the documents from collection
    const tickets = await Tickets.find().toArray();

    res.send({
        code: 200,
        message: "Success",
        data: tickets
    })
}))

router.post('/get-ticket', expressAsyncHandler( async (req, res, next) => {
    
        //get the collection object from app.js
        let Tickets = req.app.get('Tickets');
    
        //get all the documents from collection
    const ticket = await Tickets.findOne({"Registration Id": req.body.id});

        if(ticket == null) {
            res.send({
                code: 404,
                message: "Ticket Not Found",
                data: [null, req.body.id]
            })
        }

        else {
            res.send({
                code: 200,
                message: "Success",
                data: ticket
            })
        }

}))

//update check in time
router.post('/check-in', expressAsyncHandler( async (req, res, next) => {
        
        //get the collection object from app.js
        let Tickets = req.app.get('Tickets');
    
        //get all the documents from collection
        const ticket = await Tickets.findOne({"Registration Id": req.body.id});

        if(ticket == null) {
            res.send({
                code: 404,
                message: "Ticket Not Found",
                data: [null, req.body.id]
            })
        }
        else {
            const current = new Date();
            const time = current.toLocaleTimeString("en-US");
            await Tickets.updateOne({ "Registration Id": req.body.id }, { $set: {"Check-In Time": time}})
            await Tickets.updateOne({ "Registration Id": req.body.id }, {
                $set: {"Attendee Check-In": true}})
            res.send({
                code: 200,
                message: "Success",
                data: ticket
            })
        }

}))

//update check out time
router.post('/check-out', expressAsyncHandler( async (req, res, next) => {

    let Tickets = req.app.get('Tickets');

    const ticket = await Tickets.findOne({"Registration Id": req.body.id});

    if(ticket == null) {
        res.send({
            code: 404,
            message: "Ticket Not Found",
            data: [null, req.body.id]
        })
    }
    else {
        const current = new Date();
        const time = current.toLocaleTimeString("en-US");
        await Tickets.updateOne({ "Registration Id": req.body.id }, { $set: {"Check-Out Time": time}})
        await Tickets.updateOne({ "Registration Id": req.body.id }, {
            $set: {"Attendee Check-Out": true}})
        res.send({
            code: 200,
            message: "Success",
            data: ticket
        })
    }

}))


module.exports = router;