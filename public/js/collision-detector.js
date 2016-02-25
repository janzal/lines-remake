'use strict'

class CollisionDetector {
	constructor(width, height) {
		this.space = []
		for (var i = 0; i <= width; i++) {
			this.space[i] = [].fill(false, 0, height + 1)
		}
		this.width = width
		this.height = height
		this.players = []
	}

	handlePlayerMove(oldPosition, newPosition) {
		try {
			this.space[oldPosition.x][oldPosition.y] = true
		} catch (e) {

		}
		// this.space[newPosition.x][newPosition.y] = true
	}

	addPlayer(player) {
		this.players.push(player)
		player.on('move', this.handlePlayerMove.bind(this))
	}

	isCollisionAt(x, y) {
		try {
			const gamingPlane = this.space[x][y]
			const walls = (x > this.width || x < 0 || y > this.height || y < 0)
			return gamingPlane || walls
		} catch (e) {
			return true
		}
	}

	checkCollisions() {
		const collisions = this.players.reduce((cols, player) => {
			if (!player.alive) return cols

			if (this.isCollisionAt(player.head.x, player.head.y)) {
				cols.push(player)
			}

			return cols
		}, [])

		return collisions
	}
}

module.exports = CollisionDetector
