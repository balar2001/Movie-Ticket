const mongoose = require('mongoose');


const booking_data = new mongoose.Schema({

    user_info:{
        type:String
    },
    seat_number:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    ticket_price:{
        type:String
    }


  });

  const book_info_model = mongoose.model('booking_information', booking_data);


  module.exports = book_info_model;