export class Player2 {
    constructor(scene) {
        this.scene = scene;
        this.vida = 100;
        this.maxVida = 100;
        this.barraVida = null;
        this.isDead = false;
        this.Player = null; // Definir el sprite del jugador aquí
        this.keys = {}; // Almacena las teclas de control
        this.jumpSound = null; // Variable para almacenar el sonido de salto
        this.hitSound = null; // Variable para almacenar el sonido de golpe
        this.runSound = null; // Variable para almacenar el sonido de correr
        this.isRunning = false; // Controla si el sonido de correr está en reproducción
    }

    preload() {
        // Cargar imágenes para la barra de vida
        this.scene.load.image('vida1', 'assets/img/FIFAS/VIDA/VIDA100.png');
        this.scene.load.image('vida2', 'assets/img/FIFAS/VIDA/VIDA75.png');
        this.scene.load.image('vida3', 'assets/img/FIFAS/VIDA/VIDA50.png');
        this.scene.load.image('vida4', 'assets/img/FIFAS/VIDA/VIDA25.png');
        this.scene.load.image('vida5', 'assets/img/FIFAS/VIDA/VIDA1.png');
        this.scene.load.image('vida6', 'assets/img/FIFAS/VIDA/VIDA0.png');

        // Cargar imágenes para las animaciones y sprites del jugador
        const assets = [
            { key: 'caatc1', path: 'assets/img/FIFAS/caballero/ataque1.png' },
            { key: 'caatc2', path: 'assets/img/FIFAS/caballero/ataque2.png' },
            { key: 'caatc3', path: 'assets/img/FIFAS/caballero/ataque3.png' },
            { key: 'caatcd1', path: 'assets/img/FIFAS/caballero/ataqued1.png' },
            { key: 'caatcd2', path: 'assets/img/FIFAS/caballero/ataqued2.png' },
            { key: 'caatcd3', path: 'assets/img/FIFAS/caballero/ataqued3.png' },
            { key: 'cafre1', path: 'assets/img/FIFAS/caballero/frente1.png' },
            { key: 'cafre2', path: 'assets/img/FIFAS/caballero/frente2.png' },
            { key: 'cafre3', path: 'assets/img/FIFAS/caballero/frente3.png' },
            { key: 'cafre4', path: 'assets/img/FIFAS/caballero/frente4.png' },
            { key: 'cade1', path: 'assets/img/FIFAS/caballero/corre1d.png' },
            { key: 'cade2', path: 'assets/img/FIFAS/caballero/corre2d.png' },
            { key: 'caiz1', path: 'assets/img/FIFAS/caballero/corre1.png' },
            { key: 'caiz2', path: 'assets/img/FIFAS/caballero/corre2.png' },
            { key: 'casa1', path: 'assets/img/FIFAS/caballero/paradolado1.png' },
            { key: 'casa2', path: 'assets/img/FIFAS/caballero/paradolado2.png' },
            { key: 'muerto', path: 'assets/img/FIFAS/caballero/muerte.png' }
        ];

        assets.forEach(asset => {
            this.scene.load.image(asset.key, asset.path);
        });
        this.scene.load.audio('jumpSound', 'assets/img/FIFAS/jump.mp3');
        this.scene.load.audio('hitSound', 'assets/img/FIFAS/hit.mp3');
        this.scene.load.audio('runSound', 'assets/img/FIFAS/run.mp3');
    }

    create() {
        // Crear la barra de vida inicial del jugador
        this.barraVida = this.scene.add.image(200, 100, 'vida1').setDepth(1);
        this.barraVida.setScrollFactor(0);

        // Crear el sprite del jugador y configurar físicas
        this.Player = this.scene.physics.add.sprite(50, 900, 'cafre1');
        this.Player.body.setSize(this.Player.width * 0.4, this.Player.height * 0.6);
        this.Player.body.setOffset(this.Player.width * 0.3, this.Player.height * 0.1);
        this.Player.setBounce(0.2);
        this.Player.setScale(2);
        this.Player.setCollideWorldBounds(true);

        // Configurar las animaciones del jugador
        this.createAnimations();

        // Configurar teclas para controlar al jugador
        this.setupControls();

        // Inicializar sonidos
        this.jumpSound = this.scene.sound.add('jumpSound');
        this.hitSound = this.scene.sound.add('hitSound');
        this.runSound = this.scene.sound.add('runSound');

        // Detectar colisiones con los enemigos
        this.scene.physics.add.overlap(this.Player, this.scene.enemies, this.atacarEnemigo, null, this);
    }

    createAnimations() {
        const animations = [
            { key: 'frente', frames: ['cafre1', 'cafre2', 'cafre3', 'cafre4'], frameRate: 7 },
            { key: 'attacar', frames: ['caatc1', 'caatc2', 'caatc3'], frameRate: 6 },
            { key: 'attacarD', frames: ['caatcd1', 'caatcd2', 'caatcd3'], frameRate: 6 },
            { key: 'derecha', frames: ['cade1', 'cade2'], frameRate: 6 },
            { key: 'izquierda', frames: ['caiz1', 'caiz2'], frameRate: 6 },
            { key: 'saltar', frames: ['casa1', 'casa2'], frameRate: 6 },
            { key: 'morido', frames: ['muerto'], frameRate: 6 }
        ];

        animations.forEach(anim => {
            this.scene.anims.create({
                key: anim.key,
                frames: anim.frames.map(frame => ({ key: frame })),
                frameRate: anim.frameRate,
                repeat: anim.key === 'morido' ? 0 : -1
            });
        });
    }

    setupControls() {
        this.keys = {
            D: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            S: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            A: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            K: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            L: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
            W: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        };
    }

    update() {
        if (this.isDead) {
            this.Player.setVelocityX(0);
            this.Player.setVelocityY(0);
            return;
        }

        const { D, K, L, A, W } = this.keys;

        if (D.isDown || A.isDown) {
            this.Player.setVelocityX(D.isDown ? 700 : -700);
            this.Player.play(D.isDown ? 'derecha' : 'izquierda', true);

            if (!this.isRunning) {
                this.runSound.loop = true;
                this.runSound.play();
                this.isRunning = true;
            }
        } else if (K.isDown) {
            this.Player.play('attacar', true);
            this.Player.setVelocityX(0);
            this.hitSound.play();
        } else if (L.isDown) {
            this.Player.play('attacarD', true);
            this.Player.setVelocityX(0);
            this.hitSound.play();
        } else {
            this.Player.setVelocityX(0);
            this.Player.play('frente', true);

            if (this.isRunning) {
                this.runSound.stop();
                this.isRunning = false;
            }
        }

        if (W.isDown && this.Player.body.blocked.down) {
            this.Player.setVelocityY(-600);
            this.Player.play('saltar', true);
            this.jumpSound.play();
        }
    }

    atacarEnemigo(player, enemy) {
        console.log("Colisión detectada entre el jugador y un enemigo.");
        if (this.keys.K.isDown || this.keys.L.isDown) {
            const damage = 10;

            // Verificar colisión entre jugador y enemigo
            if (this.scene.physics.overlap(player, enemy)) {
                console.log("Aplicando daño al enemigo.");
                enemy.receiveDamage(damage);
            }
        }
    }

    recibirDanio(cantidadDanio) {
        if (this.isDead) return;

        this.vida = Math.max(this.vida - cantidadDanio, 0);
        this.actualizarBarraVida();
    }

    curarVida(cantidadCuracion) {
        if (this.isDead) return;

        this.vida = Math.min(this.vida + cantidadCuracion, this.maxVida);
        this.actualizarBarraVida();
    }

    actualizarBarraVida() {
        const escala = this.vida / this.maxVida;

        if (escala >= 0.75) {
            this.barraVida.setTexture('vida2');
        } else if (escala >= 0.5) {
            this.barraVida.setTexture('vida3');
        } else if (escala >= 0.25) {
            this.barraVida.setTexture('vida4');
        } else if (escala > 0) {
            this.barraVida.setTexture('vida5');
        } else {
            this.barraVida.setTexture('vida6');
            if (!this.isDead) {
                this.Player.play('morido', true);
                this.isDead = true;
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.scene.scene.start('GameOverScene');
                    },
                    callbackScope: this.scene
                });
            }
        }
    }


    morir() {
        this.isDead = true;
        this.Player.play('morido', true);
        this.runSound.stop(); // Detener el sonido de correr
        // Mostrar pantalla de "Game Over"
        this.scene.add.text(this.scene.cameras.main.midPoint.x, this.scene.cameras.main.midPoint.y, 'Game Over', {
            fontSize: '64px',
            fill: '#ff0000'
        }).setOrigin(0.5).setScrollFactor(0);
        // Pausar el juego o reiniciar el nivel
        this.scene.physics.pause();
    }
}

