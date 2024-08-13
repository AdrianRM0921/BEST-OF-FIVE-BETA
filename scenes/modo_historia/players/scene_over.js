class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    preload() {
        this.load.image('gameOverBackground', 'assets/img/gameover.png');
        this.load.image('buttonRestart', 'assets/img/btn_reiniciar.png');
        this.load.image('buttonMainMenu', 'assets/img/brn_regresar.png');
        this.load.audio('gameOverMusic', 'assets/music/game_over.mp3'); // Carga la música
    }

    create() {
        // Acceder a la escena del mapa activo
        const activeMap = this.scene.get('mapaVegetacion'); // Cambia 'mapaVegetacion' por el nombre de tu escena del mapa
    
        // Detener la música de la escena previa si está sonando
        if (activeMap && activeMap.music && activeMap.music.isPlaying) {
            activeMap.music.stop();
        }
    
        // Crear el fondo de "Game Over" y reproducir la música de "Game Over"
        const backgroundOverlay = this.add.graphics();
        backgroundOverlay.fillStyle(0x000000, 0.8);
        backgroundOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
    
        const gameOverBackground = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'gameOverBackground').setOrigin(0.5);
        gameOverBackground.alpha = 0;
    
        this.tweens.add({
            targets: gameOverBackground,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        });
    
        // Reproduce la música de Game Over
        this.gameOverMusic = this.sound.add('gameOverMusic');
        this.gameOverMusic.play({ loop: true });
    
        const buttonSpacing = 100;
        const buttonScale = 0.7;
        const baseButtonY = this.cameras.main.centerY + gameOverBackground.displayHeight / 2 + buttonSpacing;
    
        const restartButton = this.add.image(this.cameras.main.centerX, baseButtonY, 'buttonRestart').setOrigin(0.5).setInteractive();
        restartButton.setScale(buttonScale);
        restartButton.on('pointerover', () => {
            restartButton.setTint(0x87ceeb);
        });
        restartButton.on('pointerout', () => {
            restartButton.clearTint();
        });
        restartButton.on('pointerdown', () => {
            this.gameOverMusic.stop(); // Detener la música
            this.scene.stop('GameOverScene');
            this.scene.start('mapaVegetacion');
        });
    
        const mainMenuButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing, 'buttonMainMenu').setOrigin(0.5).setInteractive();
        mainMenuButton.setScale(buttonScale);
        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setTint(0x87ceeb);
        });
        mainMenuButton.on('pointerout', () => {
            mainMenuButton.clearTint();
        });
        mainMenuButton.on('pointerdown', () => {
            this.gameOverMusic.stop(); // Detener la música
            this.scene.stop('GameOverScene');
            this.scene.start('MainMenuScene');
        });
    }

    shutdown() {
        if (this.gameOverMusic) {
            this.gameOverMusic.stop();
        }
    }

    // Alternativamente, puedes usar el evento "shutdown"
    // (o puedes mantener el método `shutdown` arriba)
    // Este método será llamado automáticamente cuando la escena se detenga.
    onShutdown() {
        if (this.gameOverMusic) {
            this.gameOverMusic.stop();
        }
    }
}

export default GameOverScene;
