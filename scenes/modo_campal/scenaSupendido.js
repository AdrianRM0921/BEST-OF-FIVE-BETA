class SceneSuspendido extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneSuspendido' });
    }

    preload() {
        this.load.spritesheet('backgroundAnim3', 'assets/img/temploFU.png', {
            frameWidth: 9600 / 5,
            frameHeight: 5400 / 5
        });
        this.load.image('titulo2', 'assets/img/multiplayerAviso.png');
        this.load.image('buttonBack2', 'assets/img/btn_salir.png'); // Botón de regresar
    }

    create() {
        console.log('Creating SceneSuspendido');

        // Añade el fondo
        this.background = this.add.sprite(0, 0, 'backgroundAnim3').setOrigin(0, 0);
        console.log('Background added');

        this.anims.create({
            key: 'backgroundLoop3',
            frames: this.anims.generateFrameNumbers('backgroundAnim3', { start: 0, end: 23 }),
            frameRate: 15,
            repeat: -1
        });
        this.background.play('backgroundLoop3');
        this.scaleBackgroundToFit(this.background);
        this.background.setAlpha(0.10);

        // Añade el título
        this.titulo2 = this.add.image(this.sys.game.config.width / 2, 200, 'titulo2');
        console.log('Title added');

        this.titulo2.setOrigin(0.5, -0.2);
        this.titulo2.setScale(1);
        this.titulo2.setDepth(1);

        // Añade el botón de regresar
        const buttonBack2 = this.createImageButton(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 250, 'buttonBack2', this.goBack.bind(this));
        console.log('Button added');
        
        buttonBack2.setScale(0.2);

        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background);
            buttonBack2.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 150);
            console.log('Resize event triggered');
        });
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

    goBack() {
        console.log('Regresar al menú principal');
        this.scene.start('MainMenuScene');
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

export default SceneSuspendido;
