var express = require('express');
var router = express.Router();
const storage = require('node-persist');
var sign_up_model = require('../model/sign_up');
var book_info_model = require('../model/booking_information')

/* GET home page. */
router.get('/',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find')

  res.render('index', { data });
});


// ************************************************* start  movie_details
router.get('/movie_details',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find')

  res.render('movie_details',{data});
});
// ************************************************* Close  movie_details


// ************************************************* start  sign_up
router.get('/sign_up',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find')

  res.render('sign_up', { data });
});

router.post('/sign_up',async function(req, res, next) {

  var pass1 = req.body.user_password
  var pass1 = req.body.user_password

  var obj = {
    user_email:req.body.user_email,
    user_password:req.body.user_password,
    conform_password:req.body.conform_password
  }

  await sign_up_model.create(obj);

  res.redirect('sign_in');
});
// ************************************************* Close  sign_up

// ************************************************* start  sign_in
router.get('/sign_in',async function(req, res, next) {

  await storage.init();

  var data = await storage.getItem('find')

  console.log(data);

  res.render('sign_in', {data});
});

router.post('/sign_in',async function(req, res, next) {

  await storage.init();
  var user_email = req.body.user_email;
  var user_password = req.body.user_password;

  var find = await sign_up_model.find({user_email:user_email})


  if(find!='')
  {
    if(find[0].user_password==user_password)
    {
     await storage.setItem('find',find)
      res.redirect('/')
    }
  }
  else
  {
    res.send('please check email id')
  }
});
// ************************************************* Close  sign_in

// ************************************************* start  movie_grid
router.get('/movie_grid',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find')

  res.render('movie_grid', { data });
});
// ************************************************* Close  movie_grid


// ************************************************* start  movie_grid
router.post('/logout',async function(req, res, next) {

  await storage.init();
  // var data = await storage.getItem('find')
  // console.log(data);
  await storage.clear();

  res.redirect('/');
});
// ************************************************* Close  movie_grid




// ************************************************* start  movie_details
router.get('/movie_seat_plan',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find');

  res.render('movie_seat_plan',{data});
});

router.post('/movie_seat_plan',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find');

  if(typeof data === 'undefined')
  {
    res.send('please Login first')
    
  }
  else
  {
    var obj = {
      seat_no:req.body.seat_no,
      total_price:req.body.total_price,
      book_date:req.body.book_date,
      movie_time:req.body.movie_time,
     }
  
    if(typeof obj === 'undefined')
    {
      res.send('Please Select seat')
    }
    else
    {
    
       var seat = obj.seat_no;
       var total = obj.total_price;
       var date = obj.book_date;
       var time = obj.movie_time;
    
       var data1 = await storage.setItem('seat',seat);
       var data2 = await storage.setItem('total',total);
       var data3 = await storage.setItem('date',date);
       var data4 = await storage.setItem('time',time);
  
       res.redirect('movie_checkout')
  
    }
  }
  
  

});

// ************************************************* Close  movie_details

// ************************************************* start  movie_details
router.get('/movie_checkout',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find');

  var user = data[0].user_email;

  console.log('*********');
  console.log(user);

    var data1 = await storage.getItem('seat');
    var data2 = await storage.getItem('total');
    var data3 = await storage.getItem('date');
    var data4 = await storage.getItem('time');


  res.render('movie_checkout',{data,data1,data2,data3,data4,user});
});
// ************************************************* Close  movie_details


router.post('/booking_done',async function(req, res, next) {

  await storage.init();
  var data = await storage.getItem('find');

  var obj = {
    user_info:req.body.user_info,
    seat_number:req.body.seat_number,
    date:req.body.date,
    time:req.body.time,
    ticket_price:req.body.ticket_price
  }

  book_info_model.create(obj);

  res.redirect('/');
});



module.exports = router;
