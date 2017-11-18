'use strict'

const url = require('.')

url('gilad_rom', 24148019753, url.sizes.original)
.then(console.log)
.catch(console.error)
// -> https://c2.staticflickr.com/2/1534/24148019753_bc3bb60f50_o.jpg
