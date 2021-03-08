
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const app = express();const sequelize = require('./database/db');
const User = require('./database/models/User');
const Pago= require('./database/models/Pago');
let payInfo;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("home");

});
app.get("/signup", function(req, res) {

  res.render("signup");

});
app.get("/payment", function(req, res) {
  res.render("payment");

});
app.get("/confirmacion", function(req, res) {
  res.render("confirmacion");

});
app.post("/", function(req, res) {

  res.render("signup");

});
app.post("/payment", function(req,res){
  let user={
    email:req.body.email,
    password:req.body.password
  };
  console.log(user);
  res.redirect("/payment");
});
app.post("/signup", function(req,res){

  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email:req.body.email,
    password:req.body.password
    }).then(user => {
      res.redirect("/");
    });

});


app.post("/confirmacion",function(req,res){
  Pago.create({
    card: req.body.paymentMethod,
    nameCard: req.body.cardName,
    numberCard:req.body.cardNumber,
    dateCardMonth:req.body.expDatem,
    dateCardYear:req.body.expDatey,
    cvv:req.body.cvvCard,
    quantity:req.body.quantity

    }).then(user => {
      res.redirect("/");
    });
 payInfo={paymethod: req.body.paymentMethod,
   nameCard: req.body.cardName,
   numberCard:req.body.cardNumber,
   dateCard:req.body.expDate,
   cvv:req.body.cvvCard,
   quantity:req.body.quantity

}
res.redirect("/confirmacion");
});

app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");

  // Conectase a la base de datos
     // Force true: DROP TABLES
     sequelize.sync({ force: true }).then(() => {
         console.log("conectado a la base de datos");
     }).catch(error => {
         console.log('Se ha producido un error', error);
     })
});
