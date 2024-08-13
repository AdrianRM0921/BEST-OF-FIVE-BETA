class EndGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndGameScene' });
        this.videoOffsetX = -350; // Ajusta este valor para mover el video horizontalmente
    }

    preload() {
        // Carga el video y las imágenes para los botones
        this.load.video('bossDefeated', 'assets/img/FINAL2.mp4');
        this.load.image('buttonExit', 'assets/img/btn_salir2.png');
    }

    create() {
        // Añade el video al juego y configúralo
        this.video = this.add.video(this.videoOffsetX, this.cameras.main.centerY, 'bossDefeated')
            .setOrigin(0, 0.5)
            .setDisplaySize(this.cameras.main.width / 2, this.cameras.main.height)
            .play(true); // No se repite

        // Añade el texto de créditos (inicialmente oculto)
        this.creditsText = this.add.text(this.cameras.main.width * 0.75, this.cameras.main.height + 100, 
            'CRÉDITOS \n\n\n\n DESARROLLADORES\n\n Alumnos de 6B\n\n\nDISEÑADORES\n\n Adrian Retana Monrreal\n\nJose Dariel Sanchez Rodrigez\n\nJesus Haziel Sallas Rodriguez\n\n\nPRODUCTOR\n\nJesus del Toro Robledo\n\n\n\n\n\n¡Gracias por jugar!',     
            {
                fontSize: '24px',
                fill: '#fff',
                fontFamily: 'MedievalSharp, Arial', // Cambia a la fuente medieval
                align: 'center',
                wordWrap: { width: this.cameras.main.width / 2 - 40 }
            }).setOrigin(0.5, 1).setAlpha(1); // Visible inicialmente

        // Añade el botón de Salir en la parte superior derecha y hazlo más pequeño
        this.exitButton = this.add.image(this.cameras.main.width - 20, 30, 'buttonExit')
            .setOrigin(1, 0)
            .setInteractive()
            .setScale(0.2) // Escala ajustada para hacer el botón más pequeño
            .setAlpha(1); // Visible inicialmente

        this.exitButton.on('pointerover', () => this.exitButton.setTint(0x87ceeb));
        this.exitButton.on('pointerout', () => this.exitButton.clearTint());
        this.exitButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene'); // Cambia a la escena del menú principal
        });

        // Escucha el evento 'complete' del video para iniciar el temporizador
        this.video.on('complete', () => {
            this.time.delayedCall(2000, this.startCreditsScroll, [], this); // Llama a la función después de 2 segundos
        });

        // Ajuste de la posición del video y los botones al redimensionar la ventana
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit();
        });

        // Inicia el desplazamiento de los créditos
        this.startCreditsScroll();
    }

    startCreditsScroll() {
        // Desplaza los créditos hacia arriba y detiene el movimiento al llegar al centro
        this.tweens.add({
            targets: this.creditsText,
            y: this.cameras.main.height / 1.2, // Detiene los créditos en el centro vertical de la pantalla
            duration: 6000, // Duración del desplazamiento
            ease: 'Linear',
            onComplete: () => {
                // Acción opcional al completar el desplazamiento, si es necesario
            }
        });
    }

    scaleBackgroundToFit() {
        // Ajusta el tamaño del video al tamaño de la ventana
        const scale = Math.max((this.cameras.main.width / 2) / this.video.width, this.cameras.main.height / this.video.height);
        this.video.setScale(scale).setScrollFactor(0);
        this.video.setOrigin(0, 0.5);
        this.video.setPosition(this.videoOffsetX, this.cameras.main.centerY);
    }
}

export default EndGameScene;
