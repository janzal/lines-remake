'use strict'

const EventEmitter = require('events')
const util = require('util')

// j=74 75
class Player extends EventEmitter {
	constructor(ctx, color, position, controller) {
		super()
		this.ctx = ctx
		this.head = position
		this.direction = 0
		this.alive = false
		this.color = color
		this.controller = controller
		this.score = 0
	}

	handleKey(e) {
		this.direction += e.directionChange

		if (this.direction < 0) this.direction = 3
			else if (this.direction > 3) this.direction = 0
	}

	init() {
		this.controller.on('turn', this.handleKey.bind(this))
		this.alive = true
	}

	renderMove(oldPosition, newPosition) {
		this.ctx.beginPath()
		this.ctx.strokeStyle = this.color
		this.ctx.lineWidth = 1
		this.ctx.moveTo(oldPosition.x, oldPosition.y)
		this.ctx.lineTo(newPosition.x, newPosition.y)
		this.ctx.closePath()
		this.ctx.stroke()
	}

	move(vector) {
		this.head.x += vector[0]
		this.head.y += vector[1]
	}

	doMove() {
		if (!this.alive) return

		const oldPosition = {
			x: this.head.x,
			y: this.head.y
		}

		if (this.direction == 0) this.move([1, 0])
			else if (this.direction == 1) this.move([0, 1])
			else if (this.direction == 2) this.move([-1, 0])
			else if (this.direction == 3) this.move([0, -1])

		const newPosition = {
			x: this.head.x,
			y: this.head.y
		}

		this.score++
		this.emit('move', oldPosition, newPosition)
		this.renderMove(oldPosition, newPosition)
	}

	kill() {
		this.alive = false
	}
}

module.exports = Player
