'use strict'

const test = require('tape')
const got  = require('got')
const url  = require('./index')



test('works', (t) => {
	t.plan(3)

	url('gilad_rom', 24148019753).catch(t.fail)
	.then((url) => got(url)).catch(t.fail)
	.then((res) => { // request successful
		res.destroy()
		t.ok(200 <= res.statusCode, 'non-2xx status code')
		t.ok(res.statusCode < 300,  'non-2xx status code')
		const type = res.headers['content-type'].substr(0, 5)
		t.equal(type, 'image', 'non-image mime type')
	})
})
