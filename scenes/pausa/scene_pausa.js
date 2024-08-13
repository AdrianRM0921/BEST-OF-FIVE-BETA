class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
        this.music = null; // Para la música de fondo en la pausa
        this.musicPosition = 0; // Para guardar la posición de la música
    }

    init(data) {
        this.activeMap = data.activeMap;
        this.mapScene = this.scene.get(this.activeMap);
    }

    preload() {
        this.load.image('pauseBackground', 'assets/img/titulo.png');
        this.load.image('buttonResume', 'assets/img/btn_reanudar.png');
        this.load.image('buttonRestart', 'assets/img/btn_reiniciar.png');
        this.load.image('buttonSettings', 'assets/img/selec_opciones.png');
        this.load.image('buttonMainMenu', 'assets/img/brn_regresar.png');
    }

    create() {
        // Crear el fondo y los botones
        const backgroundOverlay = this.add.graphics();
        backgroundOverlay.fillStyle(0x000000, 0.8);
        backgroundOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        const title = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 250, 'pauseBackground').setOrigin(0.5);
        title.setScale(1.2);

        const spacingFromTitle = 220;
        const buttonSpacing = 85;
        const buttonScale = 0.7;
        const baseButtonY = this.cameras.main.centerY - 250 + spacingFromTitle;

        const resumeButton = this.add.image(this.cameras.main.centerX, baseButtonY, 'buttonResume').setOrigin(0.5).setInteractive();
        resumeButton.setScale(buttonScale);
        resumeButton.on('pointerover', () => resumeButton.setTint(0x87ceeb));
        resumeButton.on('pointerout', () => resumeButton.clearTint());
        resumeButton.on('pointerdown', () => this.handleResume());

        const restartButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing, 'buttonRestart').setOrigin(0.5).setInteractive();
        restartButton.setScale(buttonScale);
        restartButton.on('pointerover', () => restartButton.setTint(0x87ceeb));
        restartButton.on('pointerout', () => restartButton.clearTint());
        restartButton.on('pointerdown', () => this.handleRestart());

        const settingsButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing * 2, 'buttonSettings').setOrigin(0.5).setInteractive();
        settingsButton.setScale(buttonScale);
        settingsButton.on('pointerover', () => settingsButton.setTint(0x87ceeb));
        settingsButton.on('pointerout', () => settingsButton.clearTint());
        settingsButton.on('pointerdown', () => this.handleSettings());

        const mainMenuButtonSpacing = 110;
        const mainMenuButton = this.add.image(this.cameras.main.centerX, baseButtonY + buttonSpacing * 2 + mainMenuButtonSpacing, 'buttonMainMenu').setOrigin(0.5).setInteractive();
        mainMenuButton.setScale(buttonScale);
        mainMenuButton.on('pointerover', () => mainMenuButton.setTint(0x87ceeb));
        mainMenuButton.on('pointerout', () => mainMenuButton.clearTint());
        mainMenuButton.on('pointerdown', () => this.handleMainMenu());

        this.input.keyboard.on('keydown-ESC', () => this.handleResume());

        // Detener la música de la escena activa al entrar en pausa
        if (this.mapScene.music && this.mapScene.music.isPlaying) {
            this.music = this.mapScene.music;
            this.musicPosition = this.music.seek; // Guardar la posición actual
            this.music.pause();
        }
    }

    handleResume() {
        // Reanudar la música en la escena activa desde la posición guardada
        if (this.music) {
            this.music.resume(); // Reanuda la música
            this.music.seek = this.musicPosition; // Ajusta la posición
        }

        // Reanudar la escena activa
        this.scene.resume(this.activeMap);

        // Detener la escena de pausa
        this.scene.stop();
    }

    handleRestart() {
        // Detener la música de la escena de pausa si está reproduciéndose
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }

        // Detener la música de la escena actual antes de reiniciar
        if (this.mapScene && this.mapScene.music) {
            this.mapScene.music.stop();
        }

        // Detener la escena activa
        this.scene.stop(this.activeMap);

        // Reiniciar la escena activa
        this.scene.start(this.activeMap);
    }

    handleSettings() {
        // Detener la música de la escena de pausa si está reproduciéndose
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }

        // Lanzar la escena de configuración
        this.scene.launch('scene_menuOPC', { previousScene: 'PauseScene' });
    }

    handleMainMenu() {
        // Detener la música de la escena de pausa si está reproduciéndose
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }

        // Detener la escena activa y regresar al menú principal
        this.scene.stop(this.activeMap);
        this.scene.stop();
        this.scene.start('MainMenuScene');
    }
}

export default PauseScene;
