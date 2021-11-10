basic.showString("Start 3-2-1")
music.startMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.ForeverInBackground)
let player = game.createSprite(2, 2)
let food = game.createSprite(4, 4)
let spirits = game.createSprite(0, 0)
spirits.change(LedSpriteProperty.Blink, 100)
spirits.change(LedSpriteProperty.Brightness, 10)
food.change(LedSpriteProperty.Brightness, 5)
while (true) {
    basic.pause(400)
    if (spirits.get(LedSpriteProperty.X) < player.get(LedSpriteProperty.X)) {
        spirits.change(LedSpriteProperty.X, 1)
    } else if (spirits.get(LedSpriteProperty.X) > player.get(LedSpriteProperty.X)) {
        spirits.change(LedSpriteProperty.X, -1)
    } else if (spirits.get(LedSpriteProperty.Y) < player.get(LedSpriteProperty.Y)) {
        spirits.change(LedSpriteProperty.X, 1)
    } else if (spirits.get(LedSpriteProperty.Y) < player.get(LedSpriteProperty.Y)) {
        spirits.change(LedSpriteProperty.Y, -1)
    }
    if (input.acceleration(Dimension.X) > 200) {
        player.change(LedSpriteProperty.X, 1)
    } else if (input.acceleration(Dimension.X) < -200) {
        player.change(LedSpriteProperty.X, -1)
    }
    if (input.acceleration(Dimension.Y) > 200) {
        player.change(LedSpriteProperty.Y, 1)
    } else if (input.acceleration(Dimension.Y) < 200) {
        player.change(LedSpriteProperty.Y, -1)
    }
    if (player.isTouching(food)) {
        game.addScore(1)
        food.set(LedSpriteProperty.X, randint(0, 5))
        food.set(LedSpriteProperty.Y, randint(0, 5))
        if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) < 2) {
            spirits.set(LedSpriteProperty.X, 4)
            spirits.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) > 2 && food.get(LedSpriteProperty.Y) < 2) {
            spirits.set(LedSpriteProperty.X, 0)
            spirits.set(LedSpriteProperty.Y, 4)
        } else if (food.get(LedSpriteProperty.X) < 2 && food.get(LedSpriteProperty.Y) > 2) {
            spirits.set(LedSpriteProperty.X, 4)
            spirits.set(LedSpriteProperty.Y, 0)
        } else {
            spirits.set(LedSpriteProperty.X, 0)
            spirits.set(LedSpriteProperty.Y, 0)
        }
    }
    if (player.isTouching(spirits)) {
        music.stopMelody(MelodyStopOptions.Background)
        basic.showLeds(`
            . # # # .
            # . # . #
            # # # # #
            # # # # #
            # . # . #
            `)
        music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)
        game.gameOver()
    }
}
spirits.set(LedSpriteProperty.X, 4)
