class scene_cambio1 extends Phaser.Scene {
    constructor() {
        super({ key: 'scene_cambio1' });
    }

    preload() {
        this.load.image('titulowin', 'assets/img/titulo.png');
        this.load.image('botoncontinuar', 'assets/img/btn_continuar.png');
        this.load.image('botonregresar', 'assets/img/brn_regresar.png');
        this.load.audio('musicWin', 'assets/music/musicaW.mp3'); // Carga la música
    }

    create() {
        const backgroundwin = this.add.graphics();
        backgroundwin.fillStyle(0x000000, 0.8);
        backgroundwin.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        const titulowin = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'titulowin').setOrigin(0.5);
        titulowin.alpha = 0;

        this.tweens.add({
            targets: titulowin,
            alpha: 1,
            duration: 1000,
            ease: 'Linear'
        });

        // Reproduce la música
        this.musicWin = this.sound.add('musicWin');
        this.musicWin.play({ loop: true });

        const buttonSpacing = 100;
        const buttonScale = 0.7;
        const baseButtonY = this.cameras.main.centerY + titulowin.displayHeight / 2 + buttonSpacing;

        const restartButton = this.add.image(this.cameras.main.centerX, baseButtonY, 'botoncontinuar').setOrigin(0.5).setInteractive();
        restartButton.setScale(buttonScale);
        restartButton.on('pointerover', () => {
            restartButton.setTint(0x87ceeb);
        });
        restartButton.on('pointerout', () => {
            restartButton.clearTint();
        });
        restartButton.on('pointerdown', () => {
            this.musicWin.stop(); // Detener la música
            this.scene.stop('scene_cambio1');
            this.scene.start('CaveMap');
        });

        const mainMenuButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing, 'botonregresar').setOrigin(0.5).setInteractive();
        mainMenuButton.setScale(buttonScale);
        mainMenuButton.on('pointerover', () => {
            mainMenuButton.setTint(0x87ceeb);
        });
        mainMenuButton.on('pointerout', () => {
            mainMenuButton.clearTint();
        });
        mainMenuButton.on('pointerdown', () => {
            this.musicWin.stop(); // Detener la música
            this.scene.stop('scene_cambio1');
            this.scene.start('MainMenuScene');
        });
    }

    shutdown() {
        if (this.musicWin) {
            this.musicWin.stop();
        }
    }

    // Alternativamente, puedes usar el evento "shutdown"
    // (o puedes mantener el método `shutdown` arriba)
    // Este método será llamado automáticamente cuando la escena se detenga.
    onShutdown() {
        if (this.musicWin) {
            this.musicWin.stop();
        }
    }
}

export default scene_cambio1;
