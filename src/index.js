'use strict'

const Promise = require('pinkie-promise')
const { fetch } = require('fetch-ponyfill')({ Promise })
const { DomHandler, DomUtils, Parser } = require('htmlparser2')

const agent = 'derhuerst/flickr-photo-url'

// Official size suffixes info: https://www.flickr.com/services/api/misc.urls.html
const sizes = ['sq', 'q', 't', 's', 'n', 'm', 'z', 'c', 'l', 'h', 'k', 'o']
sizes.original = 'o'
sizes.large = 'k'
sizes.medium = 'c'
sizes.small = 'n'
sizes.square = 'q'

const hasProp = (o, p) => Object.prototype.hasOwnProperty.call(o, p)
const isString = arg => typeof arg === 'string'
const isNumber = arg => typeof arg === 'number' || typeof arg === 'bigint'

const url = (user, id, s) => {
	if (!isString(user)) return Promise.reject(new Error('invalid user'))
	if (!isNumber(id)) return Promise.reject(new Error('invalid photo id'))
	if (isNumber(s)) s = sizes[s] || sizes.original
	else if (isString(s) && !sizes.includes(s) && !hasProp(sizes, s)) {
		console.error(!sizes.includes(s), !hasProp(sizes, s), s)
		return Promise.reject(new Error('invalid size'))
	}

	return fetch(`https://www.flickr.com/photos/${user}/${id}/sizes/${s}/`, {
		redirect: 'follow',
		headers: { 'user-agent': agent }
	})
		.then((res) => {
			if (!res.ok) {
				const err = new Error(res.statusText)
				err.statusCode = res.status
				throw err
			}
			return res.text()
		})
		.then((html) => {
			const dom = parseHtml(html)
			const container = DomUtils.getElementById('allsizes-photo', dom, true)
			const img = DomUtils.findOne(el => el.tagName === 'img', [container], true)
			const url = img.attribs.src
			if (!url) throw new Error('failed to extract the URL from the Flickr page')
			return url
		})
}

module.exports = Object.assign(url, { sizes })

function parseHtml (html, options = {}) {
	const handler = new DomHandler(null, options)
	new Parser(handler, options).end(html)
	return handler.dom
}
