class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    preload() {
        this.load.spritesheet('backgroundAnim', 'assets/img/temploFU.png', {
            frameWidth: 9600/5,
            frameHeight: 5400/5
        });
        this.load.image('titulo', 'assets/img/titulo.png');
        this.load.image('buttonStoryMode', 'assets/img/selec_modoH.png');
        this.load.image('buttonBattleMode', 'assets/img/selec_multi.png');
        this.load.image('buttonScores', 'assets/img/selec_puntuaje.png');
        this.load.image('buttonSettings', 'assets/img/selec_opciones.png'); 
        this.load.image('buttonExit', 'assets/img/btn_salir.png');

        // Cargar la música de fondo
        this.load.audio('backgroundMusic', 'assets/music/dark_piano.mp3');
    }

    create() {
        this.background = this.add.sprite(0, 0, 'backgroundAnim').setOrigin(0, 0);
        this.anims.create({
            key: 'backgroundLoop',
            frames: this.anims.generateFrameNumbers('backgroundAnim', { start: 0, end: 23 }),
            frameRate: 15,
            repeat: -1
        });
        
        this.background.play('backgroundLoop');
        this.scaleBackgroundToFit(this.background);
        this.background.setAlpha(0.10);

        this.titulo = this.add.image(this.sys.game.config.width / 2, 300, 'titulo');
        this.titulo.setOrigin(0.5, 0.5);
        this.titulo.setScale(1.5);
        this.titulo.setDepth(1);

        this.createMainMenuButtons();

        const buttonExit = this.createImageButton(this.sys.game.config.width - 150, this.sys.game.config.height - 90, 'buttonExit', this.exitGame.bind(this));
        buttonExit.setScale(0.2);
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background);
            buttonExit.setPosition(this.sys.game.config.width - 100, this.sys.game.config.height - 50);
        });

        // Reproducir la música de fondo
        this.music = this.sound.add('backgroundMusic');
        this.music.play({
            loop: true,  // Repetir la música en bucle
            volume: 0.5  // Ajustar el volumen (0.0 a 1.0)
        });
    }

    update() {}

    createMainMenuButtons() {
        this.createImageButton(960, 600, 'buttonStoryMode', this.startStoryMode.bind(this));
        this.createImageButton(960, 670, 'buttonBattleMode', this.startBattleMode.bind(this));
        this.createImageButton(960, 770, 'buttonScores', this.showScores.bind(this));
        this.createImageButton(960, 870, 'buttonSettings', this.showSettings.bind(this));
    }

    createImageButton(x, y, imageKey, callback) {
        const button = this.add.image(x, y, imageKey);
        button.setScale(0.75);
        button.setInteractive();
        button.on('pointerdown', callback);
        button.on('pointerover', () => button.setTint(0x87ceeb));
        button.on('pointerout', () => button.clearTint());
        return button;
    }

    startStoryMode() {
        console.log('Iniciar Modo Historia');
        this.stopMusic(); // Detener la música antes de cambiar de escena
        this.scene.start('loreGameScene');
    }

    startBattleMode() {
        console.log('Iniciar Multijugador');
        this.stopMusic(); // Detener la música antes de cambiar de escena
        this.scene.start('SceneSuspendido');
    }

    showScores() {
        console.log('Mostrar Puntajes');
        this.stopMusic(); // Detener la música antes de cambiar de escena
        this.scene.start('MainMenuScene');
    }

    showSettings() {
        console.log('Mostrar Ajustes');
        this.stopMusic(); // Detener la música antes de cambiar de escena
        this.scene.start('scene_menuOPC2');
    }

    exitGame() {
        console.log('Salir del juego');
        this.stopMusic(); // Detener la música antes de cambiar de escena
        this.scene.start('BackgroundScene');
    }


    stopMusic() {
        if (this.music) {
            this.music.stop();
        }
    }

    scaleBackgroundToFit(background) {
        if (background && background.width && background.height) {
            const scaleX = this.sys.game.config.width / background.width;
            const scaleY = this.sys.game.config.height / background.height;
            const scale = Math.max(scaleX, scaleY);
            background.setScale(scale).setScrollFactor(0);
        } else {
            console.log('Error al escalar el fondo. Verifica las dimensiones del spritesheet.');
        }
    }
}

export default MainMenuScene;
