'use strict'

const Player = require('./player')
const KeyboardController = require('./keyboard-controller')
const AIController = require('./ai-controller')
const CollisionDetector = require('./collision-detector')

const gameFactory = function (canvas) {
	const ctx = canvas.getContext('2d')
	const game_width = canvas.width
	const game_height = canvas.height
	const paused = true
	const players = []

	const game = {}

	game.addPlayers = function() {
		const collisionDetector = new CollisionDetector(game_width, game_height)
		const keyboardController = new KeyboardController(74, 75)
		keyboardController.init()
		const player = new Player(ctx, 'red', { x: 100, y: 100 }, keyboardController)
		collisionDetector.addPlayer(player)
		player.init()

		const keyboardController2 = new KeyboardController(83, 68)
		keyboardController2.init()
		const player2 = new Player(ctx, 'blue', { x: 300, y: 300 }, keyboardController2)
		collisionDetector.addPlayer(player2)
		player2.init()

		const player3 = new Player(ctx, 'purple', { x: 90, y: 300 }, null)
		const aiController = new AIController(player3, collisionDetector)
		aiController.init()
		player3.controller = aiController
		collisionDetector.addPlayer(player3)
		player3.init()

		const player4 = new Player(ctx, 'purple', { x: 80, y: 500 }, null)
		const aiController2 = new AIController(player4, collisionDetector)
		aiController2.init()
		player4.controller = aiController2
		collisionDetector.addPlayer(player4)
		player4.init()

		players.push(player)
		players.push(player2)
		players.push(player3)
		players.push(player4)
	}

	game.start = function () {
		ctx.fillStyle = 'black'
		ctx.fillRect(0, 0, game_width, game_height)

		this.addPlayers()

		function loop() {
			players.forEach((player) => player.doMove())

			const collisions = collisionDetector.checkCollisions()
			if (collisions.length) {
				collisions.forEach((p) => {
					p.kill()
				})
			}
		}

		setInterval(loop, 10)
	}

	return game
}

window.Game = gameFactory