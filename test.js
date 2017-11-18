'use strict'

const assert = require('assert')
const test = require('tape-co').default
const got  = require('got')

const url  = require('.')



const validUrl = (url) =>
	got(url).then((res) => {
		res.destroy()
		assert(200 <= res.statusCode, 'non-2xx status code')
		assert(res.statusCode < 300,  'non-2xx status code')
		const type = res.headers['content-type'].substr(0, 5)
		assert.strictEqual(type, 'image', 'non-image mime type')
		return true
	}, (err) => {throw err})



test('works', function* (t) {
	const original = yield url('gilad_rom', 24148019753)
	t.ok(yield validUrl(original), 'valid url')
})



test('works with size `m`', function* (t) {
	const [original, medium] = yield Promise.all([
		url('gilad_rom', 24148019753),
		url('gilad_rom', 24148019753, 'm')
	])
	t.ok(medium !== original, 'generated the original size url')
	t.ok(yield validUrl(medium), 'valid url')
})



test('works with size `small`', function* (t) {
	const [original, small] = yield Promise.all([
		url('gilad_rom', 24148019753),
		url('gilad_rom', 24148019753, url.sizes.small)
	])
	t.ok(small !== original, 'generated the original size url')
	t.ok(yield validUrl(small), 'valid url')
})
