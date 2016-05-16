'use strict'

const got     = require('got')
const cheerio = require('cheerio')

const agent = 'derhuerst/flickr-photo-url'

const sizes = ['sq', 'q', 't', 's', 'n', 'm', 'z', 'c', 'l', 'h', 'k', 'o']
sizes.original = 'o'

const url = (user, id, size) => {
	if ('string' !== typeof user) throw new Error('invalid user')
	if ('number' !== typeof id) throw new Error('invalid photo id')
	if ('number' === typeof size) size = sizes[size] || sizes.original
	else if ('string' === typeof size && sizes.indexOf(size) < 0)
		throw new Error('invalid size')

	return got(`https://www.flickr.com/photos/${user}/${id}/sizes/${size}/`,
		{headers: {'user-agent': agent}})
	.catch((err) => err)
	.then((res) => cheerio.load(res.body)('#allsizes-photo img').attr('src'))
}

module.exports = Object.assign(url, {sizes})
