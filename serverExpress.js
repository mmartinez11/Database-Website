var express = require('express')
var app = express()
var path = require('path')

//query strings
var loginQuery = 'CALL loginInfo(?,?)';
var signupQuery = 'CALL signupAccount(?,?)';
var getDaysQuery = 'CALL getDays(?)';
var getTotalShowsQuery = 'CALL getTotalShows(?)';
var getTotalEpisodesQuery = 'CALL getTotalEpisodes(?)';
var getYearGraphQuery = 'CALL getYearGraph(?)';
var getGenreGraphQuery = 'CALL getGenreGraph(?)';
var getSourceGraphQuery = 'CALL getSourceGraph(?)';
var getSearchQuery = 'CALL getSearch(?)';
var getUpdateQuery = 'CALL addToList(?,?,?,?,?)';
var getUserQuery = 'CALL getUserData(?)';
var deleteUserPick = 'CALL deleteUserData(?,?)'

const {twoVar, oneVar, fiveVar} = require('./runthis.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});



//Pages
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'))
})
app.get('/signup.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/signup.html'))
})
app.get('/profile.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/profile.html'))
})
app.get('/search.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/search.html'))
})
app.get('/mylist.html', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/mylist.html'))
})

//stylesheets
app.get('/styleLogin.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/style/styleLogin.css'))
})
app.get('/styleProfile.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/style/styleProfile.css'))
})

//Images
app.get('/user.png', function (req, res) {
  res.sendFile(path.join(__dirname + '/graphics/user.png'))
})

//Request queries
//Used to login to account
app.post('/', urlencodedParser, async function(req, res) { 
  console.log(req.body);
  var u = (req.body.u); 
  var p = (req.body.p); 
  
  var result = await twoVar(u, p, loginQuery);
  console.log(result);
  res.send(result); 
}); 
//used to sign up for a new account
app.post('/signup.html', urlencodedParser, async function(req, res) { 
  console.log(req.body);
  var u = (req.body.u); 
  var p = (req.body.p); 
  
  var result = await twoVar(u, p, signupQuery);
  console.log(result);
  res.send(result); 
}); 
//used to get Stats
app.post('/profile.html/days', urlencodedParser, async function(req, res) { 
  var curID = (req.body.id); 

  var days = await oneVar(curID, getDaysQuery);
  var eps = await oneVar(curID, getTotalEpisodesQuery);
  var shows = await oneVar(curID, getTotalShowsQuery);
  var yearGraph = await oneVar(curID, getYearGraphQuery);
  var genreGraph = await oneVar(curID, getGenreGraphQuery);
  var sourceGraph = await oneVar(curID, getSourceGraphQuery);
  var result = [days, eps, shows, yearGraph, genreGraph, sourceGraph];
  //var result = days.concat(eps).concat(shows).concat(yearGraph);
  console.log(result);
  res.send(result); 
});

//Use to get user data
app.post('/mylist.html/days', urlencodedParser, async function(req, res) { 

  var curID = (req.body.id); 

  var userResult = await oneVar(curID, getUserQuery);
  
  console.log(userResult);
  res.send(userResult); 
});

//Use to remove shows from list
app.post('/mylist.html/weeks', urlencodedParser, async function(req, res) { 

  var ma = (req.body.a);
  var mb = (req.body.b);

  var deleteResult= await twoVar(ma, mb, deleteUserPick);

  console.log(deleteResult);
  res.send(deleteResult);
  
});

//Use to get search Results
app.post('/search.html/days', urlencodedParser, async function(req, res) { 

  var curID = (req.body.id); 

  var searchResult = await oneVar(curID, getSearchQuery);
  
  console.log(searchResult);
  res.send(searchResult); 
});

//Use to insert/update user list data 
app.post('/search.html/weeks', urlencodedParser, async function(req, res) {

  var ma = (req.body.a);
  var mb = (req.body.b);
  var mc = (req.body.c);
  var md = (req.body.d);
  var me = (req.body.e);

  var insertResult = await fiveVar(ma, mb, mc, md, me, getUpdateQuery);

  console.log(insertResult);
  res.send(insertResult);

});

app.listen(3000)