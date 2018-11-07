'use strict';

const {Elm} = require('./Main');
var app = Elm.Main.init();

app.ports.toJs.subscribe(data => {
  console.log(data);
})
