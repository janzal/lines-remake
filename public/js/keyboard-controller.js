'use strict'

const Controller = require('./controller')

class KeyboardController extends Controller {
	constructor(leftCode, rightCode) {
		super()

		this.leftCode = leftCode
		this.rightCode = rightCode
	}

	init() {
		window.addEventListener('keyup', (e) => {
			if (e.keyCode == this.leftCode) this.emit('turn', { directionChange: -1 })
				else if (e.keyCode == this.rightCode) this.emit('turn', { directionChange: 1 })
		})
	}
}

module.exports = KeyboardController