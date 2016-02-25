'use strict'

const Controller = require('./controller')

class AIController extends Controller {
	constructor(player, collisionDetector) {
		super()

		this.collisionDetector = collisionDetector
		this.player = player
		this.direction = player.direction
	}

	handleMove() {
		if (Math.random() < 0.3) {
			return
		}

		if (Math.random() < 0.008) {
			return this.emit('turn', { directionChange: 1 })
		}

		if (Math.random() < 0.008) {
			return this.emit('turn', { directionChange: -1 })
		}

		if (this.direction == 0) {
			if (this.collisionDetector.isCollisionAt(this.player.head.x + 5, this.player.head.y)) {
				this.emit('turn', { directionChange: 1 })
			}
		} else if (this.direction == 1) {
			if (this.collisionDetector.isCollisionAt(this.player.head.x, this.player.head.y + 5)) {
				this.emit('turn', { directionChange: 1 })
			}
		} else if (this.direction == 2) {
			if (this.collisionDetector.isCollisionAt(this.player.head.x - 5, this.player.head.y)) {
				this.emit('turn', { directionChange: -1 })
			}
		} else if (this.direction == 3) {
			if (this.collisionDetector.isCollisionAt(this.player.head.x , this.player.head.y - 5)) {
				this.emit('turn', { directionChange: -1 })
			}
		}
	}

	init() {
		this.player.on('move', this.handleMove.bind(this))
	}
}

module.exports = AIController