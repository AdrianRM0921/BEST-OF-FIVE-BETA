class loreGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'loreGameScene' });
    }

    preload() {
        // Carga el video y las imágenes para los botones
        this.load.video('loreVideo', 'assets/img/loreV.mp4');
        this.load.image('botonContinuar', 'assets/img/btn_continuar.png');
        this.load.image('titulo', 'assets/img/titulo.png');
    }

    create() {
        // Añade el video al juego y configúralo
        this.video = this.add.video(this.videoOffsetX, this.cameras.main.centerY, 'loreVideo')
            .setOrigin(0, 0.5)
            .play(false); // No se repite

        // Añade el botón de Salir en la parte superior derecha y hazlo más pequeño
        this.exitButton = this.add.image(this.cameras.main.width - 20, 30, 'botonContinuar')
            .setOrigin(1, 0)
            .setInteractive()
            .setScale(0.5) // Escala ajustada para hacer el botón más pequeño
            .setAlpha(1); // Visible inicialmente

        this.exitButton.on('pointerover', () => this.exitButton.setTint(0x87ceeb));
        this.exitButton.on('pointerout', () => this.exitButton.clearTint());
        this.exitButton.on('pointerdown', () => {
            this.scene.start('mapaVegetacion'); // Cambia a la escena del menú principal
        });

        // Añade el título en la parte inferior izquierda
        this.title = this.add.image(20, this.cameras.main.height - 20, 'titulo')
            .setOrigin(0, 1)
            .setScale(0.5); // Ajusta la escala si es necesario

        // Escucha el evento 'complete' del video para iniciar el temporizador
        this.video.on('complete', () => {
            this.time.delayedCall(2000, this.startCreditsScroll, [], this); // Llama a la función después de 2 segundos
        });
    }
    
    startCreditsScroll() {
        // Implementa el desplazamiento de los créditos aquí
    }
}

export default loreGameScene;
