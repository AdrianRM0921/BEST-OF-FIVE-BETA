class scene_cambio3 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene_cambio3' });
    }

    preload() {
        this.load.image('titulowin3', 'assets/img/titulo.png');
        this.load.image('botoncontinuar3', 'assets/img/btn_continuar.png');
        this.load.image('botonregresar3', 'assets/img/brn_regresar.png');
        this.load.audio('musicwin3', 'assets/music/musicaW.mp3'); // Carga la música
    }

    create() {
        const backgroundwin3 = this.add.graphics();
        backgroundwin3.fillStyle(0x000000, 0.8);
        backgroundwin3.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        const titulo3 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'titulowin3').setOrigin(0.5);
        titulo3.alpha = 0;

        this.tweens.add({
            targets: titulo3,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        });

        // Reproduce la música
        this.musicwin3 = this.sound.add('musicwin3');
        this.musicwin3.play({ loop: true });

        const buttonSpacing = 100;
        const buttonScale = 0.7;
        const baseButtonY = this.cameras.main.centerY + titulo3.displayHeight / 2 + buttonSpacing;

        const restartButton = this.add.image(this.cameras.main.centerX, baseButtonY, 'botoncontinuar3').setOrigin(0.5).setInteractive();
        restartButton.setScale(buttonScale);
        restartButton.on('pointerover', () => {
            restartButton.setTint(0x87ceeb);
        });
        restartButton.on('pointerout', () => {
            restartButton.clearTint();
        });
        restartButton.on('pointerdown', () => {
            this.musicwin3.stop(); // Detener la música
            this.scene.stop('scene_cambio3');
            this.scene.start('EndGameScene');
        });

        const mainMenuButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing, 'botonregresar3').setOrigin(0.5).setInteractive();
        mainMenuButton.setScale(buttonScale);
        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setTint(0x87ceeb);
        });
        mainMenuButton.on('pointerout', () => {
            mainMenuButton.clearTint();
        });
        mainMenuButton.on('pointerdown', () => {
            this.musicwin3.stop(); // Detener la música
            this.scene.stop('scene_cambio3');
            this.scene.start('MainMenuScene');
        });
    }

    shutdown() {
        if (this.musicwin3) {
            this.musicwin3.stop();
        }
    }

    // Alternativamente, puedes usar el evento "shutdown"
    // (o puedes mantener el método `shutdown` arriba)
    // Este método será llamado automáticamente cuando la escena se detenga.
    onShutdown() {
        if (this.musicwin3) {
            this.musicwin3.stop();
        }
    }
}

export default scene_cambio3;
