const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '4b92a931447136699669190e17171a06';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let kota = req.body.kota;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${kota}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'gagal, masukin nama kotanya yg bener'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'gagal, masukin nama kotanya yg bener'});
      } else {
        let weatherText = `cuacanya ${(weather.main.temp - 32) * 0.555 } celcius di ${weather.name}!`;         

        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})