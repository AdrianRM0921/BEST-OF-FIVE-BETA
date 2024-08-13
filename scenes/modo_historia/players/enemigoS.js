export class EnemigoS {
    constructor(scene) {
        this.scene = scene;
        this.enemigos = this.scene.add.group();
        this.dmSound = null;
        this.enemigosDerrotados = 0;
        this.mof = null;
        this.dialog = null;
        this.boss = null;

        // Inicializa las teclas de ataque
        this.keyL = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        this.keyK = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
    }

    preload() {
        // Cargar recursos del enemigo
        this.scene.load.image('atacar1_D', 'assets/img/FIFAS/enemigo1/ataqued1.png');
        this.scene.load.image('atacar2_D', 'assets/img/FIFAS/enemigo1/ataqued2.png');
        this.scene.load.image('atacar1_I', 'assets/img/FIFAS/enemigo1/ataquei1.png');
        this.scene.load.image('atacar2_I', 'assets/img/FIFAS/enemigo1/ataquei2.png');
        this.scene.load.image('caminar1_D', 'assets/img/FIFAS/enemigo1/caminad1.png');
        this.scene.load.image('caminar2_D', 'assets/img/FIFAS/enemigo1/caminad2.png');
        this.scene.load.image('caminar1_I', 'assets/img/FIFAS/enemigo1/caminai1.png');
        this.scene.load.image('caminar2_I', 'assets/img/FIFAS/enemigo1/caminai2.png');
        this.scene.load.image('parado1', 'assets/img/FIFAS/enemigo1/parado1.png');
        this.scene.load.image('parado2', 'assets/img/FIFAS/enemigo1/parado2.png');
        this.scene.load.image('muerte1_D', 'assets/img/FIFAS/enemigo1/muerted1.png');
        this.scene.load.image('muerte2_D', 'assets/img/FIFAS/enemigo1/muerted2.png');
        this.scene.load.image('muerte1_I', 'assets/img/FIFAS/enemigo1/muertei1.png');
        this.scene.load.image('muerte2_I', 'assets/img/FIFAS/enemigo1/muertei1.png');

        // Cargar imágenes de moneda feik
        this.scene.load.image('monedaf1', 'assets/img/FIFAS/monedas/monedaf.png');
        this.scene.load.image('monedaf2', 'assets/img/FIFAS/monedas/monedaf2.png');
        this.scene.load.image('monedaf3', 'assets/img/FIFAS/monedas/monedaf3.png');
        this.scene.load.image('monedaf4', 'assets/img/FIFAS/monedas/monedaf4.png');
        this.scene.load.image('monedaf5', 'assets/img/FIFAS/monedas/monedaf5.png');
        this.scene.load.image('monedaf6', 'assets/img/FIFAS/monedas/monedaf6.png');
        this.scene.load.image('dialog', 'assets/img/FIFAS/monedas/diagolo.png');

        // Cargar imágenes de moneda real
        this.scene.load.image('moneda1', 'assets/img/FIFAS/monedas/moneda1.png');
        this.scene.load.image('moneda2', 'assets/img/FIFAS/monedas/moneda2.png');
        this.scene.load.image('moneda3', 'assets/img/FIFAS/monedas/moneda3.png');
        this.scene.load.image('moneda4', 'assets/img/FIFAS/monedas/moneda4.png');
        this.scene.load.image('moneda5', 'assets/img/FIFAS/monedas/moneda5.png');
        this.scene.load.image('moneda6', 'assets/img/FIFAS/monedas/moneda6.png');

        // boss
        this.scene.load.image('escavari1', 'assets/img/FIFAS/boss1/escavari1.png');
        this.scene.load.image('escavari2', 'assets/img/FIFAS/boss1/escavari2.png');
        this.scene.load.image('escavari3', 'assets/img/FIFAS/boss1/escavari3.png');
        this.scene.load.image('escavari4', 'assets/img/FIFAS/boss1/escavari4.png');
        this.scene.load.image('escavari5', 'assets/img/FIFAS/boss1/escavari5.png');
        this.scene.load.image('escavari6', 'assets/img/FIFAS/boss1/escavari6.png');
        this.scene.load.image('escavari7', 'assets/img/FIFAS/boss1/escavari7.png');
        this.scene.load.image('escavari8', 'assets/img/FIFAS/boss1/escavari8.png');
        this.scene.load.image('escavari9', 'assets/img/FIFAS/boss1/escavari9.png');
        this.scene.load.image('escavari10', 'assets/img/FIFAS/boss1/escavari10.png');
        this.scene.load.image('escavari11', 'assets/img/FIFAS/boss1/escavari11.png');
        this.scene.load.image('escavari12', 'assets/img/FIFAS/boss1/escavari12.png');
        this.scene.load.image('escavari13', 'assets/img/FIFAS/boss1/escavari13.png');
        this.scene.load.image('escavari14', 'assets/img/FIFAS/boss1/escavari14.png');
        this.scene.load.image('escavari15', 'assets/img/FIFAS/boss1/escavari15.png');
        this.scene.load.image('escavari16', 'assets/img/FIFAS/boss1/escavari16.png');
        this.scene.load.image('ataqued1', 'assets/img/FIFAS/boss1/ataqued1.png');
        this.scene.load.image('ataqued2', 'assets/img/FIFAS/boss1/ataqued2.png');
        this.scene.load.image('ataqued3', 'assets/img/FIFAS/boss1/ataqued3.png');
        this.scene.load.image('ataqued4', 'assets/img/FIFAS/boss1/ataqued4.png');
        this.scene.load.image('ataqued5', 'assets/img/FIFAS/boss1/ataqued5.png');
        this.scene.load.image('ataquei1', 'assets/img/FIFAS/boss1/ataquei1.png');
        this.scene.load.image('ataquei2', 'assets/img/FIFAS/boss1/ataquei2.png');
        this.scene.load.image('ataquei3', 'assets/img/FIFAS/boss1/ataquei3.png');
        this.scene.load.image('ataquei4', 'assets/img/FIFAS/boss1/ataquei4.png');
        this.scene.load.image('ataquei5', 'assets/img/FIFAS/boss1/ataquei5.png');
        this.scene.load.image('muerte1', 'assets/img/FIFAS/boss1/muertei1.png');
        this.scene.load.image('muerte2', 'assets/img/FIFAS/boss1/muertei2.png');
        this.scene.load.image('muerte3', 'assets/img/FIFAS/boss1/muertei3.png');
        this.scene.load.image('muerte4', 'assets/img/FIFAS/boss1/muertei4.png');
        this.scene.load.image('muerte5', 'assets/img/FIFAS/boss1/muertei5.png');
        this.scene.load.image('muerte6', 'assets/img/FIFAS/boss1/muertei6.png');

        // Cargar imágenes de vida del enemigo
        this.scene.load.image('vida_enemigo1', 'assets/img/FIFAS/vida/VIDA100.png');
        this.scene.load.image('vida_enemigo2', 'assets/img/FIFAS/vida/VIDA75.png');
        this.scene.load.image('vida_enemigo3', 'assets/img/FIFAS/vida/VIDA50.png');
        this.scene.load.image('vida_enemigo4', 'assets/img/FIFAS/vida/VIDA25.png');
        this.scene.load.image('vida_enemigo5', 'assets/img/FIFAS/vida/VIDA1.png');
        this.scene.load.image('vida_enemigo6', 'assets/img/FIFAS/vida/VIDA0.png');

        // Cargar sonidos
        this.scene.load.audio('dmSound', 'assets/img/FIFAS/dm.mp3');
    }

    create(x, y) {
        const enemy = this.scene.physics.add.sprite(x, y, 'parado1');
        enemy.body.setSize(enemy.width * 0.4, enemy.height * 0.6);
        enemy.body.setOffset(enemy.width * 0.3, enemy.height * 0.1);
        enemy.setBounce(0.2);
        enemy.setScale(2);
        enemy.setCollideWorldBounds(true);
    
        enemy.vida = 50;
        enemy.maxVida = 50;
        enemy.barraVida = this.scene.add.image(x, y - 50, 'vida_enemigo1').setDepth(1);
        enemy.barraVida.setScale(0.5);
    
        // Definir animaciones
        this.scene.anims.create({
            key: 'caminar_D',
            frames: [{ key: 'caminar1_D' }, { key: 'caminar2_D' }],
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'atacar_D',
            frames: [{ key: 'atacar1_D' }, { key: 'atacar2_D' }],
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'caminar_I',
            frames: [{ key: 'caminar1_I' }, { key: 'caminar2_I' }],
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'atacar_I',
            frames: [{ key: 'atacar1_I' }, { key: 'atacar2_I' }],
            frameRate: 5,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'deadm',
            frames: [{ key: 'muerte1_D' }, { key: 'muerte2_D' }],
            frameRate: 2,
            repeat: 0
        });
        this.scene.anims.create({
            key: 'monedafeiks',
            frames: [{ key: 'monedaf1' }, { key: 'monedaf2' }, { key: 'monedaf3' }, { key: 'monedaf4' }, { key: 'monedaf5' }, { key: 'monedaf6' }],
            frameRate: 10,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'escavar',
            frames: [{ key: 'escavari1' }, { key: 'escavari2' }, { key: 'escavari4' }, { key: 'escavari5' }, { key: 'escavari6' }, { key: 'escavari7' }, { key: 'escavari8' }, { key: 'escavari9' }, { key: 'escavari10' }, { key: 'escavari11' }, { key: 'escavari12' }, { key: 'escavari13' }, { key: 'escavari14' }, { key: 'escavari15' }, { key: 'escavari16' }],
            frameRate: 10,
            repeat: -1
        });
    
        this.dmSound = this.scene.sound.add('dmSound');
    
        enemy.anims.play('caminar_D', true);
    
        this.enemigos.add(enemy);
    
        // Agregar colisión entre el jugador y los enemigos
        this.scene.physics.add.collider(this.scene.player.Player, this.enemigos, this.hitEnemy, null, this);
    
        // Crear el texto del contador de enemigos derrotados solo una vez
        if (!this.contadorTexto) {
        this.contadorTexto = this.scene.add.text(16, 16, `Enemigos derrotados: ${this.enemigosDerrotados}`, {
            fontSize: '32px',
            fill: '#fff'
        }).setDepth(1000);
        this.contadorTexto.setScrollFactor(0);
    }

         // Configurar el contador para seguir a la cámara
        this.contadorTexto.setScrollFactor(0); // Esto asegura que el texto no se mueva con la cámara
    
        this.mof = this.scene.physics.add.sprite(4500, 500, 'monedaf1');
        this.mof.body.setSize(this.mof.width * 0.8, this.mof.height * 0.98);
        this.mof.body.setOffset(this.mof.width * 0.3, this.mof.height * 0.1);
        this.mof.setBounce(0.8);
        this.mof.setCollideWorldBounds(true);
        this.mof.anims.play('monedafeiks', true);
    
        this.boss = this.scene.physics.add.sprite(4000, 500, 'escavari1');
        this.boss.body.setSize(this.boss.width * 0.8, this.boss.height * 0.98);
        this.boss.body.setOffset(this.boss.width * 0.3, this.boss.height * 0.1);
        this.boss.setBounce(0.8);
        this.boss.setCollideWorldBounds(true);
        this.boss.setScale(4);
        this.boss.anims.play('escavar', true);
    
        // Configurar colisiones entre mof y otros enemigos, pero no con el jugador ni con los enemigos
        this.scene.physics.add.collider(this.mof, this.scene.layers['Terreno']);
        this.scene.physics.add.collider(this.mof, this.enemigos, this.handleMofCollision, null, this);
        this.scene.physics.add.overlap(this.mof, this.scene.player.Player, this.handlePlayerMofOverlap, null, this);
    
        this.scene.physics.add.collider(this.boss, this.scene.layers['Terreno']); // Solo colisiones con capas de mapa
    
        return enemy;
    }
    

    update(player) {
        if (!player) {
            console.warn("Jugador no definido.");
            return;
        }

        // Actualizar enemigos
        this.enemigos.getChildren().forEach(enemy => {
            if (enemy && enemy.x !== undefined && enemy.y !== undefined && enemy.vida > 0) {
                const distancia = Phaser.Math.Distance.Between(enemy.x, enemy.y, player.Player.x, player.Player.y);

                // Actualizar posición de la barra de vida
                enemy.barraVida.setPosition(enemy.x, enemy.y - 50);

                if (distancia < 300) {
                    // Seguir al jugador solo en el eje x
                    if (player.Player.x > enemy.x) {
                        enemy.setVelocityX(100);
                        enemy.anims.play('caminar_D', true);
                    } else if (player.Player.x < enemy.x) {
                        enemy.setVelocityX(-100);
                        enemy.anims.play('caminar_I', true);
                    } else {
                        enemy.setVelocityX(0);
                        enemy.anims.stop();
                    }

                    if (Math.abs(enemy.x - player.Player.x) < 50) {
                        // Ataque
                        if (player.Player.x > enemy.x) {
                            enemy.anims.play('atacar_D', true);
                        } else {
                            enemy.anims.play('atacar_I', true);
                        }
                        this.atacarJugador(enemy, player);
                    }
                } else {
                    // Detener al enemigo si está lejos
                    enemy.setVelocityX(0);
                    enemy.anims.stop();
                }
            }
        });

        // Actualizar boss
        if (this.boss) {
            const distanciaBoss = Phaser.Math.Distance.Between(this.boss.x, this.boss.y, player.Player.x, player.Player.y);

            if (distanciaBoss < 5000) { // Rango en el que el boss sigue al jugador
                if (player.Player.x > this.boss.x) {
                    this.boss.setVelocityX(150);
                    this.boss.anims.play('escavar', true);
                } else if (player.Player.x < this.boss.x) {
                    this.boss.setVelocityX(-150);
                    this.boss.anims.play('escavar', true);
                } else {
                    this.boss.setVelocityX(0);
                    this.boss.anims.stop();
                }

                if (Math.abs(this.boss.x - player.Player.x) < 100 && Math.abs(this.boss.y - player.Player.y) < 100) {
                    this.boss.anims.play('ataqued1', true); // Animación de ataque del boss
                    this.atacarJugador(this.boss, player);
                }
            } else {
                // Detener al boss si está lejos
                this.boss.setVelocityX(0);
                this.boss.anims.stop();
            }
        }

        // Actualizar el texto del contador de enemigos derrotados
        this.contadorTexto.setText(`Enemigos derrotados: ${this.enemigosDerrotados}`);
    }

    atacarJugador(enemy, player) {
        if (Math.abs(enemy.x - player.Player.x) < 50 && Math.abs(enemy.y - player.Player.y) < 50) {
            // Lógica de daño al jugador
            player.recibirDanio(10);
        }
    }

    receiveDamage(enemy, cantidadDanio) {
        enemy.vida = Math.max(enemy.vida - cantidadDanio, 0);
        this.actualizarBarraVida(enemy);

        if (enemy.vida <= 0) {
            // Reproducir animación de muerte
            enemy.anims.play('deadm', true);

            // Reproducir sonido
            this.dmSound.play();

            // Incrementar el contador de enemigos derrotados
            this.enemigosDerrotados++;
            console.log(`Enemigos derrotados: ${this.enemigosDerrotados}`);

            // Detener al enemigo
            enemy.setVelocity(0);

            // Detener todas las animaciones y movimientos
            enemy.anims.stop();
            enemy.setVelocity(0);

            // Asegúrate de que el evento 'animationcomplete' esté configurado
            enemy.on('animationcomplete-deadm', (animation, frame) => {
                if (enemy.barraVida) {
                    enemy.barraVida.destroy();
                }
                enemy.destroy();
            });
        }
    }

    actualizarBarraVida(enemy) {
        const escala = enemy.vida / enemy.maxVida;
    
        const vidaTextures = [
            { threshold: 0.75, texture: 'vida_enemigo1' },
            { threshold: 0.5, texture: 'vida_enemigo2' },
            { threshold: 0.25, texture: 'vida_enemigo3' },
            { threshold: 0.1, texture: 'vida_enemigo4' },
            { threshold: 0, texture: 'vida_enemigo5' },
        ];
    
        const texture = vidaTextures.find(v => escala >= v.threshold)?.texture || 'vida_enemigo5';
    
        enemy.barraVida.setTexture(texture);
    
        // Si el enemigo está muerto, esperar 3 segundos y luego eliminar la barra de vida
        if (enemy.vida <= 0) {
            setTimeout(() => {
                if (enemy.barraVida) {
                    enemy.barraVida.destroy();
                }
            }, 1000);
        }
    }
    

    hitEnemy(player, enemy) {
        if (player.body.velocity.y > 0 && enemy.body.touching.up) {
            this.receiveDamage(enemy, enemy.vida); // Elimina al enemigo
            setTimeout(() => {
                enemy.disableBody(true, true);
            }, 1000);
            player.setVelocityY(-200); // Rebota al jugador hacia arriba
        } else {
            // Si el jugador no está atacando desde arriba
            player.disableBody(true, true)
        }
    }

    handleMofCollision(mof, other) {
        if (this.dialog) {
            // Si ya hay un diálogo visible, no hacer nada
            return;
        }
        if (other.texture.key === 'jugador') {
            this.dialog = this.scene.add.text(mof.x, mof.y - 50, '¡Has encontrado un item!', { fontSize: '20px', fill: '#fff' });
            setTimeout(() => {
                if (this.dialog) {
                    this.dialog.destroy();
                    this.dialog = null;
                }
            }, 2000);
            mof.destroy();
        }
    }
    
    handlePlayerMofOverlap(player, mof) {
        if (player.body.velocity.y > 0 && mof.body.touching.up) {
            this.receiveDamage(mof, mof.vida); // Elimina el mof
            setTimeout(() => {
                mof.disableBody(true, true);
            }, 1000);
            player.setVelocityY(-200); // Rebota al jugador hacia arriba

            // Cambiar de escena
            this.scene.start('scene_cambio1');
        } else {
            // Si el jugador no está atacando desde arriba
            player.disableBody(true, true)
        }
    }
}
