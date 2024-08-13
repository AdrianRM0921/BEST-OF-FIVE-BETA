export class EnemigoS3 {
    constructor(scene3) {
        this.scene3 = scene3;
        this.enemigos3 = this.scene3.add.group();
    }

    preload() {
        // Cargar recursos del enemigo
        this.scene3.load.image('atacar1_D3', 'assets/img/FIFAS/enemigo3/ataque1.png');
        this.scene3.load.image('atacar2_D3', 'assets/img/FIFAS/enemigo3/ataque2.png');
        this.scene3.load.image('atacar3_D3', 'assets/img/FIFAS/enemigo3/ataque3.png');
        this.scene3.load.image('atacar4_D3', 'assets/img/FIFAS/enemigo3/ataque4.png');
        this.scene3.load.image('atacar5_D3', 'assets/img/FIFAS/enemigo3/ataque5.png');
        this.scene3.load.image('atacar1_I3', 'assets/img/FIFAS/enemigo3/ataque1.png');
        this.scene3.load.image('atacar2_I3', 'assets/img/FIFAS/enemigo3/ataque2.png');
        this.scene3.load.image('atacar3_I3', 'assets/img/FIFAS/enemigo3/ataque3.png');
        this.scene3.load.image('atacar4_I3', 'assets/img/FIFAS/enemigo3/ataque4.png');
        this.scene3.load.image('atacar5_I3', 'assets/img/FIFAS/enemigo3/ataque5.png');
        this.scene3.load.image('caminar1_D3', 'assets/img/FIFAS/enemigo3/derecha1.png');
        this.scene3.load.image('caminar2_D3', 'assets/img/FIFAS/enemigo3/derecha2.png');
        this.scene3.load.image('caminar3_D3', 'assets/img/FIFAS/enemigo3/derecha3.png');
        this.scene3.load.image('caminar4_D3', 'assets/img/FIFAS/enemigo3/derecha4.png');
        this.scene3.load.image('caminar1_I3', 'assets/img/FIFAS/enemigo3/izquierda1.png');
        this.scene3.load.image('caminar2_I3', 'assets/img/FIFAS/enemigo3/izquierda2.png');
        this.scene3.load.image('caminar3_I3', 'assets/img/FIFAS/enemigo3/izquierda3.png');
        this.scene3.load.image('caminar4_I3', 'assets/img/FIFAS/enemigo3/izquierda4.png');
        this.scene3.load.image('parado13', 'assets/img/FIFAS/enemigo3/frente1.png');
        this.scene3.load.image('parado23', 'assets/img/FIFAS/enemigo3/frente2.png');
        this.scene3.load.image('parado33', 'assets/img/FIFAS/enemigo3/frente3.png');
        this.scene3.load.image('parado43', 'assets/img/FIFAS/enemigo3/frente4.png');
        this.scene3.load.image('muerte1_D3', 'assets/img/FIFAS/enemigo3/muere1.png');
        this.scene3.load.image('muerte2_D3', 'assets/img/FIFAS/enemigo3/muere2.png');
        this.scene3.load.image('muerte3_D3', 'assets/img/FIFAS/enemigo3/muere3.png');

        // Cargar imágenes de moneda feik
        this.scene3.load.image('monedaf1', 'assets/img/FIFAS/monedas/monedaf.png');
        this.scene3.load.image('monedaf2', 'assets/img/FIFAS/monedas/monedaf2.png');
        this.scene3.load.image('monedaf3', 'assets/img/FIFAS/monedas/monedaf3.png');
        this.scene3.load.image('monedaf4', 'assets/img/FIFAS/monedas/monedaf4.png');
        this.scene3.load.image('monedaf5', 'assets/img/FIFAS/monedas/monedaf5.png');
        this.scene3.load.image('monedaf6', 'assets/img/FIFAS/monedas/monedaf6.png');
        this.scene3.load.image('dialog', 'assets/img/FIFAS/monedas/diagolo.png');

        // Cargar imágenes de moneda real
        this.scene3.load.image('moneda1', 'assets/img/FIFAS/monedas/moneda1.png');
        this.scene3.load.image('moneda2', 'assets/img/FIFAS/monedas/moneda2.png');
        this.scene3.load.image('moneda3', 'assets/img/FIFAS/monedas/moneda3.png');
        this.scene3.load.image('moneda4', 'assets/img/FIFAS/monedas/moneda4.png');
        this.scene3.load.image('moneda5', 'assets/img/FIFAS/monedas/moneda5.png');
        this.scene3.load.image('moneda6', 'assets/img/FIFAS/monedas/moneda6.png');

        // Cargar imágenes de moneda real plata
        this.scene3.load.image('monedap1', 'assets/img/FIFAS/monedas/monedap1.png');
        this.scene3.load.image('monedap2', 'assets/img/FIFAS/monedas/monedap2.png');
        this.scene3.load.image('monedap3', 'assets/img/FIFAS/monedas/monedap3.png');
        this.scene3.load.image('monedap4', 'assets/img/FIFAS/monedas/monedap4.png');
        this.scene3.load.image('monedap5', 'assets/img/FIFAS/monedas/monedap5.png');
        this.scene3.load.image('monedap6', 'assets/img/FIFAS/monedas/monedap6.png');

        // Cargar imágenes de Boss
        this.scene3.load.image('frente1', 'assets/img/FIFAS/bossfinal/frente1.png');
        this.scene3.load.image('frente2', 'assets/img/FIFAS/bossfinal/frente2.png');
        this.scene3.load.image('frente3', 'assets/img/FIFAS/bossfinal/frente3.png');
        this.scene3.load.image('frente4', 'assets/img/FIFAS/bossfinal/frente4.png');
        this.scene3.load.image('ataque1', 'assets/img/FIFAS/bossfinal/ataque1.png');
        this.scene3.load.image('ataque2', 'assets/img/FIFAS/bossfinal/ataque2.png');
        this.scene3.load.image('ataque3', 'assets/img/FIFAS/bossfinal/ataque3.png');
        this.scene3.load.image('ataque4', 'assets/img/FIFAS/bossfinal/ataque4.png');
        this.scene3.load.image('ataque5', 'assets/img/FIFAS/bossfinal/ataque5.png');
        this.scene3.load.image('ataquee1', 'assets/img/FIFAS/bossfinal/ataquee1.png');
        this.scene3.load.image('ataquee2', 'assets/img/FIFAS/bossfinal/ataquee2.png');
        this.scene3.load.image('ataquee3', 'assets/img/FIFAS/bossfinal/ataquee3.png');
        this.scene3.load.image('ataquee4', 'assets/img/FIFAS/bossfinal/ataquee4.png');
        this.scene3.load.image('ataquee5', 'assets/img/FIFAS/bossfinal/ataquee5.png');
        this.scene3.load.image('ataquei1', 'assets/img/FIFAS/bossfinal/ataquei1.png');
        this.scene3.load.image('ataquei2', 'assets/img/FIFAS/bossfinal/ataquei2.png');
        this.scene3.load.image('ataquei3', 'assets/img/FIFAS/bossfinal/ataquei3.png');
        this.scene3.load.image('ataquei4', 'assets/img/FIFAS/bossfinal/ataquei4.png');
        this.scene3.load.image('ataquei5', 'assets/img/FIFAS/bossfinal/ataquei5.png');
        this.scene3.load.image('ataqueei1', 'assets/img/FIFAS/bossfinal/ataqueei1.png');
        this.scene3.load.image('ataqueei2', 'assets/img/FIFAS/bossfinal/ataqueei2.png');
        this.scene3.load.image('ataqueei3', 'assets/img/FIFAS/bossfinal/ataqueei3.png');
        this.scene3.load.image('ataqueei4', 'assets/img/FIFAS/bossfinal/ataqueei4.png');
        this.scene3.load.image('ataqueei5', 'assets/img/FIFAS/bossfinal/ataqueei5.png');
        this.scene3.load.image('muerte1', 'assets/img/FIFAS/bossfinal/muerte1.png');
        this.scene3.load.image('muerte2', 'assets/img/FIFAS/bossfinal/muerte2.png');
        this.scene3.load.image('muerte3', 'assets/img/FIFAS/bossfinal/muerte3.png');
        this.scene3.load.image('muerte4', 'assets/img/FIFAS/bossfinal/muerte4.png');
        this.scene3.load.image('muerte5', 'assets/img/FIFAS/bossfinal/muerte5.png');
        this.scene3.load.image('muerte6', 'assets/img/FIFAS/bossfinal/muerte6.png');
        this.scene3.load.image('muerte7', 'assets/img/FIFAS/bossfinal/muerte7.png');
        this.scene3.load.image('muerte8', 'assets/img/FIFAS/bossfinal/muerte8.png');
        

        // Cargar imágenes de vida del enemigo
        this.scene3.load.image('vida_enemigo13', 'assets/img/FIFAS/VIDA/VIDA100.png');
        this.scene3.load.image('vida_enemigo23', 'assets/img/FIFAS/VIDA/VIDA75.png');
        this.scene3.load.image('vida_enemigo33', 'assets/img/FIFAS/VIDA/VIDA50.png');
        this.scene3.load.image('vida_enemigo43', 'assets/img/FIFAS/VIDA/VIDA25.png');
        this.scene3.load.image('vida_enemigo53', 'assets/img/FIFAS/VIDA/VIDA1.png');
        this.scene3.load.image('vida_enemigo63', 'assets/img/FIFAS/VIDA/VIDA0.png');
    }

    create(x, y) {
        const enemy3 = this.scene3.physics.add.sprite(x, y, 'parado13');
        enemy3.body.setSize(enemy3.width * 0.4, enemy3.height * 0.6);
        enemy3.body.setOffset(enemy3.width * 0.3, enemy3.height * 0.1);
        enemy3.setBounce(0.2);
        enemy3.setScale(2);
        enemy3.setCollideWorldBounds(true);
        
        enemy3.vida = 50;
        enemy3.maxVida = 50;
        enemy3.barraVida = this.scene3.add.image(x, y - 50, 'vida_enemigo13').setDepth(1);
        enemy3.barraVida.setScale(0.5);

        this.scene3.anims.create({
            key: 'caminar_D3',
            frames: [{ key: 'caminar1_D3' }, { key: 'caminar2_D3' }, { key: 'caminar3_D3' }, { key: 'caminar4_D3' }],
            frameRate: 10,
            repeat: -1
        });

        this.scene3.anims.create({
            key: 'atacar_D3',
            frames: [{ key: 'atacar1_D3' }, { key: 'atacar2_D3' }, { key: 'atacar3_D3' }, { key: 'atacar4_D3' }],
            frameRate: 5,
            repeat: -1
        });

        this.scene3.anims.create({
            key: 'caminar_I3',
            frames: [{ key: 'caminar1_I3' }, { key: 'caminar2_I3' }, { key: 'caminar3_I3' }, { key: 'caminar4_I3' }],
            frameRate: 5,
            repeat: -1
        });

        this.scene3.anims.create({
            key: 'atacar_I3',
            frames: [{ key: 'atacar1_I3' }, { key: 'atacar2_I3' }, { key: 'atacar3_I3' }, { key: 'atacar4_I3' }],
            frameRate: 5,
            repeat: -1
        });

        // Otras animaciones...

        enemy3.anims.play('caminar_D3', true);

        this.enemigos3.add(enemy3);

        return enemy3;
    }

    update(player) {
        if (!player) {
            console.warn("Jugador no definido.");
            return;
        }

        this.enemigos3.getChildren().forEach(enemy3 => {
            if (enemy3 && enemy3.x !== undefined && enemy3.y !== undefined) {
                const distancia = Phaser.Math.Distance.Between(enemy3.x, enemy3.y, player.x, player.y);

                if (distancia < 300) {
                    if (!enemy3.isAttacking) {
                        enemy3.isAttacking = true;
                        this.scene3.physics.moveToObject(enemy3, player, 100);
                        enemy3.anims.play(enemy3.x < player.x ? 'atacar_D3' : 'atacar_I3', true);
                    }
                } else {
                    enemy3.isAttacking = false;
                    enemy3.body.setVelocity(0);
                    enemy3.anims.play(enemy3.x < player.x ? 'caminar_D3' : 'caminar_I3', true);
                }

                if (enemy3.barraVida) {
                    enemy3.barraVida.setPosition(enemy3.x, enemy3.y - 50);
                }
            } else {
                console.warn("Enemigo con propiedades indefinidas:", enemy3);
            }
        });
    }

    receiveDamage(enemy3, amount) {
        if (enemy3.vida <= 0) return;
        
        enemy3.vida -= amount;
        if (enemy3.vida < 0) enemy3.vida = 0;
        
        const escala = enemy3.vida / enemy3.maxVida;
        if (escala >= 0.75) {
            enemy3.barraVida.setTexture('vida_enemigo13');
        } else if (escala >= 0.5) {
            enemy3.barraVida.setTexture('vida_enemigo23');
        } else if (escala >= 0.25) {
            enemy3.barraVida.setTexture('vida_enemigo33');
        } else if (escala > 0) {
            enemy3.barraVida.setTexture('vida_enemigo43');
        } else {
            enemy3.barraVida.setTexture('vida_enemigo63');
            this.scene3.time.delayedCall(500, () => {
                enemy3.destroy(); // Destruye el enemigo después de un tiempo
            });
        }
    }
}
