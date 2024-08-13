class scene_cambio2 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene_cambio2' });
    }

    preload() {
        this.load.image('titulo2', 'assets/img/titulo.png');
        this.load.image('botoncontinuar2', 'assets/img/btn_continuar.png');
        this.load.image('botonregresar2', 'assets/img/brn_regresar.png');
        this.load.audio('musicwin2', 'assets/music/musicaW.mp3'); // Carga la música
    }

    create() {
        const backgroundwin2 = this.add.graphics();
        backgroundwin2.fillStyle(0x000000, 0.8);
        backgroundwin2.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        const titulo2 = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'titulo2').setOrigin(0.5);
        titulo2.alpha = 0;

        this.tweens.add({
            targets: titulo2,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        });

        // Reproduce la música
        this.musicwin2 = this.sound.add('musicwin2');
        this.musicwin2.play({ loop: true });

        const buttonSpacing = 100;
        const buttonScale = 0.7;
        const baseButtonY = this.cameras.main.centerY + titulo2.displayHeight / 2 + buttonSpacing;

        const restartButton = this.add.image(this.cameras.main.centerX, baseButtonY, 'botoncontinuar2').setOrigin(0.5).setInteractive();
        restartButton.setScale(buttonScale);
        restartButton.on('pointerover', () => {
            restartButton.setTint(0x87ceeb);
        });
        restartButton.on('pointerout', () => {
            restartButton.clearTint();
        });
        restartButton.on('pointerdown', () => {
            this.musicwin2.stop(); // Detener la música
            this.scene.stop('scene_cambio2');
            this.scene.start('mapaCueva3');
        });

        const mainMenuButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing, 'botonregresar2').setOrigin(0.5).setInteractive();
        mainMenuButton.setScale(buttonScale);
        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setTint(0x87ceeb);
        });
        mainMenuButton.on('pointerout', () => {
            mainMenuButton.clearTint();
        });
        mainMenuButton.on('pointerdown', () => {
            this.musicwin2.stop(); // Detener la música
            this.scene.stop('scene_cambio2');
            this.scene.start('MainMenuScene');
        });
    }

    shutdown() {
        if (this.musicwin2) {
            this.musicwin2.stop();
        }
    }

    // Alternativamente, puedes usar el evento "shutdown"
    // (o puedes mantener el método `shutdown` arriba)
    // Este método será llamado automáticamente cuando la escena se detenga.
    onShutdown() {
        if (this.musicwin2) {
            this.musicwin2.stop();
        }
    }
}

export default scene_cambio2;
