import React, { useRef, useEffect } from 'react'
import './coolBackground.scss'

export default function CoolBackground() {
    const canvasRef = useRef()

    useEffect(() => {
        if (canvasRef.current != null) handleRender()
    }, [canvasRef])

    const handleRender = () => {
        let gameWidth
        let gameHeight

        const gameInit = () => {
            const { offsetWidth, offsetHeight } = canvasRef.current

            gameWidth = offsetWidth
            gameHeight = offsetHeight

            canvasRef.current.width = gameWidth
            canvasRef.current.height = gameHeight
        }

        gameInit()
        window.addEventListener('resize', gameInit)

        const ctx = canvasRef.current.getContext('2d')

        let DOM = []
        let Time = {
            deltaTime: 3,
            lastTime: 0,
        }

        class GameObject {
            constructor({ id }) {
                this.id = id
                this.x = Math.floor(Math.random() * gameWidth + 1)
                this.y = Math.floor(Math.random() * gameHeight + 1)
                this.width = 10
                this.height = this.width
                this.velocityX = (Math.random() - 0.5) / 13
                this.velocityY = (Math.random() - 0.5) / 13
            }

            update() {
                const { x, y, velocityX, velocityY, width, height } = this
                const { deltaTime } = Time

                if (x < 0) {
                    this.velocityX *= -1
                    this.x = 0
                    return
                }
                if (x > gameWidth - width) {
                    this.velocityX *= -1
                    this.x = gameWidth - width
                    return
                }
                if (y < 0) {
                    this.velocityY *= -1
                    this.y = 0
                    return
                }
                if (y > gameHeight - height) {
                    this.velocityY *= -1
                    this.y = gameHeight - height
                    return
                }

                this.x += velocityX * deltaTime
                this.y += velocityY * deltaTime
            }

            draw() {
                const { x, y, width, height } = this

                ctx.beginPath()
                ctx.rect(x, y, width, height)
                ctx.fillStyle = '#240090'
                ctx.fill()
            }
        }

        const amount = 30

        for (let i = 0; i < amount; i++) {
            DOM.push(new GameObject({ id: i }))
        }

        const clearCanvas = () => ctx.clearRect(0, 0, gameWidth, gameHeight)

        const gameLoop = timeStamp => {
            Time.deltaTime = timeStamp - Time.lastTime
            Time.lastTime = timeStamp

            clearCanvas()

            DOM.forEach(object => {
                object.update()
                object.draw()
            })

            window.requestAnimationFrame(gameLoop)
        }

        window.requestAnimationFrame(gameLoop)
    }

    return <canvas className="cool-background" ref={canvasRef}></canvas>
}
