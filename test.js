'use strict'

const assert = require('assert')
const test = require('tape-co').default
const Promise = require('pinkie-promise')
const fetch = require('fetch-ponyfill')({Promise: Promise}).fetch

const url  = require('.')



const validUrl = (url) => {
	return fetch(url, {
		method: 'GET',
		redirect: 'follow',
		headers: {
			'user-agent': 'derhuerst/flickr-photo-url test'
		}
	})
	.then((res) => {
		assert(200 <= res.status, 'non-2xx status code')
		assert(res.status < 300, 'non-2xx status code')
		const type = res.headers.get('content-type').substr(0, 5)
		assert.strictEqual(type, 'image', 'non-image mime type')

		return true // todo: abort res
	})
}



test('works', function* (t) {
	const original = yield url('gilad_rom', 24148019753)
	t.ok(yield validUrl(original), 'valid url')
})



test('works with size `m`', function* (t) {
	const res = yield Promise.all([
		url('gilad_rom', 24148019753),
		url('gilad_rom', 24148019753, 'm')
	])
	const original = res[0]
	const medium = res[1]

	t.ok(medium !== original, 'generated the original size url')
	t.ok(yield validUrl(medium), 'valid url')
})



test('works with size `small`', function* (t) {
	const res = yield Promise.all([
		url('gilad_rom', 24148019753),
		url('gilad_rom', 24148019753, url.sizes.small)
	])
	const original = res[0]
	const small = res[1]

	t.ok(small !== original, 'generated the original size url')
	t.ok(yield validUrl(small), 'valid url')
})
