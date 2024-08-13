export class EnemigoS2 {
    constructor(scene) {
        this.scene = scene;
        this.enemigos2 = this.scene.add.group(); // Usa un grupo de Phaser en lugar de un array
        this.dmSound = null;
        this.enemigosDerrotados = 0; // Contador de enemigos derrotados

        // Inicializa las teclas de ataque
        this.keyL = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.keyK = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    }

    preload() {
        // Cargar recursos del enemigo
        this.scene.load.image('atacar1_D2', 'assets/img/FIFAS/enemigo2/ataque1.png');
        this.scene.load.image('atacar2_D2', 'assets/img/FIFAS/enemigo2/ataque2.png');
        this.scene.load.image('atacar3_D2', 'assets/img/FIFAS/enemigo2/ataque3.png');
        this.scene.load.image('atacar1_I2', 'assets/img/FIFAS/enemigo2/ataquei1.png');
        this.scene.load.image('atacar2_I2', 'assets/img/FIFAS/enemigo2/ataquei2.png');
        this.scene.load.image('atacar3_I2', 'assets/img/FIFAS/enemigo2/ataquei3.png');
        this.scene.load.image('caminar1_D2', 'assets/img/FIFAS/enemigo2/camina1.png');
        this.scene.load.image('caminar2_D2', 'assets/img/FIFAS/enemigo2/camina2.png');
        this.scene.load.image('caminar3_D2', 'assets/img/FIFAS/enemigo2/camina3.png');
        this.scene.load.image('caminar1_I2', 'assets/img/FIFAS/enemigo2/caminai1.png');
        this.scene.load.image('caminar2_I2', 'assets/img/FIFAS/enemigo2/caminai2.png');
        this.scene.load.image('caminar3_I2', 'assets/img/FIFAS/enemigo2/caminai3.png');
        this.scene.load.image('parado12', 'assets/img/FIFAS/enemigo2/frente1.png');
        this.scene.load.image('muerte1_D2', 'assets/img/FIFAS/enemigo2/muerte.png');
        this.scene.load.image('muerte2_D2', 'assets/img/FIFAS/enemigo2/muerte2.png');
        this.scene.load.image('muerte3_D2', 'assets/img/FIFAS/enemigo2/muerte3.png');

        // Cargar imágenes de vida del enemigo
        this.scene.load.image('vida_enemigo12', 'assets/img/FIFAS/VIDA/VIDA100.png');
        this.scene.load.image('vida_enemigo22', 'assets/img/FIFAS/VIDA/VIDA75.png');
        this.scene.load.image('vida_enemigo32', 'assets/img/FIFAS/VIDA/VIDA50.png');
        this.scene.load.image('vida_enemigo42', 'assets/img/FIFAS/VIDA/VIDA25.png');
        this.scene.load.image('vida_enemigo52', 'assets/img/FIFAS/VIDA/VIDA1.png');
        this.scene.load.image('vida_enemigo62', 'assets/img/FIFAS/VIDA/VIDA0.png');

        // Cargar imágenes de moneda feik
        this.scene2.load.image('monedaf1', 'assets/img/FIFAS/monedas/monedaf.png');
        this.scene2.load.image('monedaf2', 'assets/img/FIFAS/monedas/monedaf2.png');
        this.scene2.load.image('monedaf3', 'assets/img/FIFAS/monedas/monedaf3.png');
        this.scene2.load.image('monedaf4', 'assets/img/FIFAS/monedas/monedaf4.png');
        this.scene2.load.image('monedaf5', 'assets/img/FIFAS/monedas/monedaf5.png');
        this.scene2.load.image('monedaf6', 'assets/img/FIFAS/monedas/monedaf6.png');
        this.scene2.load.image('dialog', 'assets/img/FIFAS/monedas/diagolo.png');

        // Cargar imágenes de moneda real
        this.scene2.load.image('moneda1', 'assets/img/FIFAS/monedas/moneda1.png');
        this.scene2.load.image('moneda2', 'assets/img/FIFAS/monedas/moneda2.png');
        this.scene2.load.image('moneda3', 'assets/img/FIFAS/monedas/moneda3.png');
        this.scene2.load.image('moneda4', 'assets/img/FIFAS/monedas/moneda4.png');
        this.scene2.load.image('moneda5', 'assets/img/FIFAS/monedas/moneda5.png');
        this.scene2.load.image('moneda6', 'assets/img/FIFAS/monedas/moneda6.png');

        // Cargar imágenes de moneda real plata
        this.scene2.load.image('monedap1', 'assets/img/FIFAS/monedas/monedap1.png');
        this.scene2.load.image('monedap2', 'assets/img/FIFAS/monedas/monedap2.png');
        this.scene2.load.image('monedap3', 'assets/img/FIFAS/monedas/monedap3.png');
        this.scene2.load.image('monedap4', 'assets/img/FIFAS/monedas/monedap4.png');
        this.scene2.load.image('monedap5', 'assets/img/FIFAS/monedas/monedap5.png');
        this.scene2.load.image('monedap6', 'assets/img/FIFAS/monedas/monedap6.png');

        // Cargar imágenes de Boss
        this.scene2.load.image('frente1', 'assets/img/FIFAS/boss2/frente1.png');
        this.scene2.load.image('frente2', 'assets/img/FIFAS/boss2/frente2.png');
        this.scene2.load.image('frente3', 'assets/img/FIFAS/boss2/frente3.png');
        this.scene2.load.image('frente4', 'assets/img/FIFAS/boss2/frente4.png');
        this.scene2.load.image('frente5', 'assets/img/FIFAS/boss2/frente5.png');
        this.scene2.load.image('frente6', 'assets/img/FIFAS/boss2/frente6.png');
        this.scene2.load.image('ataque1', 'assets/img/FIFAS/boss2/ataque1.png');
        this.scene2.load.image('ataque2', 'assets/img/FIFAS/boss2/ataque2.png');
        this.scene2.load.image('ataque3', 'assets/img/FIFAS/boss2/ataque3.png');
        this.scene2.load.image('ataque4', 'assets/img/FIFAS/boss2/ataque4.png');
        this.scene2.load.image('ataque5', 'assets/img/FIFAS/boss2/ataque5.png');
        this.scene2.load.image('ataque6', 'assets/img/FIFAS/boss2/ataque6.png');
        this.scene2.load.image('ataque7', 'assets/img/FIFAS/boss2/ataque7.png');
        this.scene2.load.image('ataque8', 'assets/img/FIFAS/boss2/ataque8.png');
        this.scene2.load.image('ataquei1', 'assets/img/FIFAS/boss2/ataquei1.png');
        this.scene2.load.image('ataquei2', 'assets/img/FIFAS/boss2/ataquei2.png');
        this.scene2.load.image('ataquei3', 'assets/img/FIFAS/boss2/ataquei3.png');
        this.scene2.load.image('ataquei4', 'assets/img/FIFAS/boss2/ataquei4.png');
        this.scene2.load.image('ataquei5', 'assets/img/FIFAS/boss2/ataquei5.png');
        this.scene2.load.image('ataquei6', 'assets/img/FIFAS/boss2/ataquei6.png');
        this.scene2.load.image('ataquei7', 'assets/img/FIFAS/boss2/ataquei7.png');
        this.scene2.load.image('ataquei8', 'assets/img/FIFAS/boss2/ataquei8.png');
        this.scene2.load.image('muerte1', 'assets/img/FIFAS/boss2/muerte1.png');
        this.scene2.load.image('muerte2', 'assets/img/FIFAS/boss2/muerte2.png');
        this.scene2.load.image('muerte3', 'assets/img/FIFAS/boss2/muerte3.png');
        this.scene2.load.image('muerte4', 'assets/img/FIFAS/boss2/muerte4.png');
        this.scene2.load.image('muerte5', 'assets/img/FIFAS/boss2/muerte5.png');
        this.scene2.load.image('muerte6', 'assets/img/FIFAS/boss2/muerte6.png');


        // Cargar sonidos
        this.scene.load.audio('dmSound', 'assets/img/FIFAS/dm.mp3');
    }

    create(x, y) {
        const enemy2 = this.scene.physics.add.sprite(x, y, 'parado12');
        enemy2.body.setSize(enemy2.width * 0.4, enemy2.height * 0.6);
        enemy2.body.setOffset(enemy2.width * 0.3, enemy2.height * 0.1);
        enemy2.setBounce(0.2);
        enemy2.setScale(2);
        enemy2.setCollideWorldBounds(true);
        
        enemy2.vida = 50;
        enemy2.maxVida = 50;
        enemy2.barraVida = this.scene.add.image(x, y - 50, 'vida_enemigo12').setDepth(1);
        enemy2.barraVida.setScale(0.5);

        // Definir animaciones
        this.scene.anims.create({
            key: 'caminar_D2',
            frames: [{ key: 'caminar1_D2' }, { key: 'caminar2_D2' }, { key: 'caminar3_D2' }],
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'atacar_D2',
            frames: [{ key: 'atacar1_D2' }, { key: 'atacar2_D2' }, { key: 'atacar3_D2' }],
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'caminar_I2',
            frames: [{ key: 'caminar1_I2' }, { key: 'caminar2_I2' }, { key: 'caminar3_I2' }],
            frameRate: 10,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'atacar_I2',
            frames: [{ key: 'atacar1_I2' }, { key: 'atacar2_I2' }, { key: 'atacar3_I2' }],
            frameRate: 10,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'deadm',
            frames: [{ key: 'muerte1_D2' }, { key: 'muerte2_D2' }, { key: 'muerte3_D2' }],
            frameRate: 5,
            repeat: 0
        });

        this.dmSound = this.scene.sound.add('dmSound');

        enemy2.anims.play('caminar_D2', true);

        this.enemigos2.add(enemy2);

        // Agregar colisionador entre el jugador y los enemigos
        this.scene.physics.add.collider(this.scene.player.Player, this.enemigos2, this.hitEnemy, null, this);

        // Agregar texto para el contador de enemigos derrotados
        this.contadorTexto = this.scene.add.text(16, 16, `Enemigos derrotados: ${this.enemigosDerrotados}`, {
            fontSize: '32px',
            fill: '#fff'
        });

        return enemy2;
    }

    update(player) {
        if (!player) {
            console.warn("Jugador no definido.");
            return;
        }

        this.enemigos2.getChildren().forEach(enemy2 => {
            if (enemy2 && enemy2.x !== undefined && enemy2.y !== undefined && enemy2.vida > 0) {
                const distancia = Phaser.Math.Distance.Between(enemy2.x, enemy2.y, player.Player.x, player.Player.y);

                // Actualizar posición de la barra de vida
                enemy2.barraVida.setPosition(enemy2.x, enemy2.y - 50);

                if (distancia < 300) {
                    if (!enemy2.isAttacking) {
                        enemy2.isAttacking = true;
                        this.scene.physics.moveToObject(enemy2, player.Player, 100);
                        enemy2.anims.play(enemy2.x < player.Player.x ? 'atacar_D2' : 'atacar_I2', true);
                    }
                } else {
                    enemy2.isAttacking = false;
                    enemy2.body.setVelocity(0);
                    enemy2.anims.play(enemy2.x < player.Player.x ? 'caminar_D2' : 'caminar_I2', true);
                }

                if (enemy2.barraVida) {
                    enemy2.barraVida.setPosition(enemy2.x, enemy2.y - 50);
                }
            } else {
                console.warn("Enemigo con propiedades indefinidas:", enemy2);
            }
        });

        // Actualizar el texto del contador de enemigos derrotados
        this.contadorTexto.setText(`Enemigos derrotados: ${this.enemigosDerrotados}`);
    }

    atacarJugador(enemy2, player) {
        if (Math.abs(enemy2.x - player.Player.x) < 50 && Math.abs(enemy2.y - player.Player.y) < 50) {
            // Lógica de daño al jugador
            player.recibirDanio(10);
        }
    }

    receiveDamage(enemy2, cantidadDanio) {
        enemy2.vida = Math.max(enemy2.vida - cantidadDanio, 0);
        this.actualizarBarraVida(enemy2);

        if (enemy2.vida <= 0) {
            // Reproducir animación de muerte
            enemy2.anims.play('deadm', true);

            // Reproducir sonido
            this.dmSound.play();

            // Incrementar el contador de enemigos derrotados
            this.enemigosDerrotados++;

            // Eliminar el enemigo después de la animación de muerte
            enemy2.once('animationcomplete', () => {
                enemy2.destroy();
            });
        }
    }

    actualizarBarraVida(enemy2) {
        let texture;
        if (enemy2.vida > 75) {
            texture = 'vida_enemigo12';
        } else if (enemy2.vida > 50) {
            texture = 'vida_enemigo22';
        } else if (enemy2.vida > 25) {
            texture = 'vida_enemigo32';
        } else if (enemy2.vida > 0) {
            texture = 'vida_enemigo42';
        } else {
            texture = 'vida_enemigo52';
        }
        if (enemy2.barraVida) {
            enemy2.barraVida.setTexture(texture);
        }
    }

    hitEnemy(player, enemy2) {
        if (player.body.touching.down && player.body.velocity.y > 0) {
            // Si el jugador está cayendo y toca al enemigo desde arriba
            this.receiveDamage(enemy2, 10); // Puedes ajustar el daño
        } else {
            player.recibirDanio(10); // El jugador recibe daño
        }
    }
}
