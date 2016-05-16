# flickr-photo-url 📷

To get a simple file, you need a Flickr API key. To get a Flickr API key, you need a Flickr account. A Flickr account is a Yahoo account. To get a Yahoo account, you need to give your full name, birth date & phone number.

This module allows your to **download Flickr photos without API key** by giving you the direct URL of the photo.

[![npm version](https://img.shields.io/npm/v/flickr-photo-url.svg)](https://www.npmjs.com/package/flickr-photo-url)
[![dependency status](https://img.shields.io/david/derhuerst/flickr-photo-url.svg)](https://david-dm.org/derhuerst/flickr-photo-url)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/flickr-photo-url.svg)


## Installing

```
npm install flickr-photo-url
```


## Usage

```
url(user, photoId, [size])
```

```js
const url = require('flickr-photo-url')

url('gilad_rom', '24148019753', url.sizes.original)
.catch(console.error).then(console.log)
// -> https://c2.staticflickr.com/2/1534/24148019753_bc3bb60f50_o.jpg
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/flickr-photo-url/issues).
