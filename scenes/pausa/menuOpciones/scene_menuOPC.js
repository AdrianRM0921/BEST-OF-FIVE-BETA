export default class scene_menuOPC extends Phaser.Scene {
    constructor() {
        super({ key: 'scene_menuOPC' });
    }

    init(data) {
        this.previousScene = data.previousScene;
    }

    preload() {
        this.load.image('settingsBackground', 'assets/img/titulo.png');
        this.load.image('buttonBack', 'assets/img/btn_salir.png');
    }

    create() {
        const backgroundOverlay = this.add.graphics();
        backgroundOverlay.fillStyle(0x000000, 0.8);
        backgroundOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        const title = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 250, 'settingsBackground').setOrigin(0.5);
        title.setScale(1.2);

        const spacingFromTitle = 220;
        const buttonSpacing = 85;
        const baseButtonY = this.cameras.main.centerY - 250 + spacingFromTitle;

        // Configuración del texto de volumen
        const volumeText = this.add.text(this.cameras.main.centerX, baseButtonY, 'Volume', {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5);

        // Barra de volumen mejorada
        const volumeBarWidth = 300;
        const volumeBarHeight = 30;
        const volumeSlider = this.add.rectangle(this.cameras.main.centerX, baseButtonY + buttonSpacing, volumeBarWidth, volumeBarHeight, 0x888888).setOrigin(0.5).setInteractive();
        const volumeHandle = this.add.circle(this.cameras.main.centerX, baseButtonY + buttonSpacing, 15, 0xffffff).setInteractive();

        volumeSlider.on('pointerdown', (pointer) => {
            const newVolume = Phaser.Math.Clamp((pointer.x - volumeSlider.x + volumeSlider.width / 2) / volumeSlider.width, 0, 1);
            this.sound.volume = newVolume;
            volumeHandle.x = volumeSlider.x - volumeSlider.width / 2 + newVolume * volumeSlider.width;
        });

        this.input.setDraggable(volumeHandle);
        this.input.on('drag', (pointer, gameObject, dragX) => {
            if (gameObject === volumeHandle) {
                const newVolume = Phaser.Math.Clamp((dragX - volumeSlider.x + volumeSlider.width / 2) / volumeSlider.width, 0, 1);
                this.sound.volume = newVolume;
                volumeHandle.x = volumeSlider.x - volumeSlider.width / 2 + newVolume * volumeSlider.width;
            }
        });

        // Botón de regreso más pequeño
        const buttonScale = 0.3;
        const backButton = this.createImageButton(this.sys.game.config.width - 100, this.sys.game.config.height - 100, 'buttonBack', this.goBack.bind(this));
        backButton.setScale(buttonScale);

        // Ajuste de la posición del botón al redimensionar la ventana
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background);
            backButton.setPosition(this.sys.game.config.width - 100, this.sys.game.config.height - 100);
        });
    }

    createImageButton(x, y, key, callback) {
        const button = this.add.image(x, y, key).setOrigin(0.5).setInteractive();
        button.on('pointerover', () => button.setTint(0x87ceeb));
        button.on('pointerout', () => button.clearTint());
        button.on('pointerdown', callback);
        return button;
    }

    goBack() {
        this.scene.stop();
        if (this.previousScene) {
            this.scene.resume(this.previousScene);
        }
    }

    scaleBackgroundToFit(background) {
        if (background && background.width && background.height) {
            const scale = Math.max(this.sys.game.config.width / background.width, this.sys.game.config.height / background.height);
            background.setScale(scale).setScrollFactor(0);
            background.setOrigin(0, 0);
            background.setPosition(
                (this.sys.game.config.width - background.width * scale) / 2,
                (this.sys.game.config.height - background.height * scale) / 2
            );
        } else {
            console.error('Error al escalar el fondo. Verifica las dimensiones del spritesheet.');
        }
    }
}
