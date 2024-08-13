import { Player } from "./players/testAnim.js";
import { EnemigoS3 } from "./players/enemigoS_3.js";

class mapaCueva3 extends Phaser.Scene {
    constructor() {
        super({ key: 'mapaCueva3' });
        this.player = null;
        this.layers3 = {};
        this.healthBar = null;
        this.enemigos3 = null;
        this.background33 = null;
        this.scaleRatio3 = 1;
        this.music = null;
    }

    preload() {
        // Cargar recursos generales de la escena
        this.load.spritesheet('background4', 'assets/img/cuevaFire.png', { frameWidth: 9600 / 5, frameHeight: 3240 / 3 });
        this.load.image('Pisos13', 'assets/Assets_1024_Cave/Cave-BigRocks1.png');
        this.load.image('Pisos23', 'assets/Assets_1024_Cave/Cave-Floor.png');
        this.load.image('Pisos33', 'assets/Assets_1024_Cave/Cave-Platforms.png');
        this.load.image('Pisos43', 'assets/Assets_1024_Cave/Cave-RockCombinations1.png');
        this.load.image('Pisos53', 'assets/Vegetation/Grass5/Plant5_00002.png');
        this.load.image('Pisos63', 'assets/Vegetation/Group_Plant/GroupPlants_00010.png');
        this.load.image('Pisos73', 'assets/Vegetation/Grass2/Grass2_00010.png');
        this.load.image('Pisos83', 'assets/Vegetation/Grass3/Comp_1_00002.png');
        this.load.tilemapTiledJSON('tilemap3', 'scenes/modo_historia/mapaCueva3/mapacueva3.json');

        // Cargar música
        this.load.audio('heater', 'assets/music/hunter.mp3');
        
        // Cargar recursos del jugador
        this.player = new Player(this);
        this.player.preload();

        // Cargar recursos del enemigo
        this.enemigos3 = new EnemigoS3(this);
        this.enemigos3.preload();
    }

    create() {
        // Crear elementos de la escena
        this.input.keyboard.on('keydown-P', () => {
            this.scene.launch('PauseScene', { activeMap: 'mapaCueva3' });
            this.scene.pause();
        });

        // Configurar la tecla 'C' para cambiar a otra escena
        this.input.keyboard.on('keydown-C', () => {
            this.music.stop(); // Detener la música
            this.scene.stop('mapaCueva3'); // Detener la escena actual
            this.scene.start('scene_cambio3'); // Cambiar a otra escena
        });

        // Crear animaciones para el fondo
        this.anims.create({
            key: 'background5',
            frames: this.anims.generateFrameNumbers('background4', { start: 0, end: 7 }),
            frameRate: 6,
            repeat: -1,
        });

        // Crear el fondo
        this.background33 = this.add.sprite(0, 0, 'background4').setOrigin(0, 0).play('background5');
        this.scaleBackgroundToFit(this.background33);

        // Crear el mapa y las capas
        const map3 = this.make.tilemap({ key: 'tilemap3' });
        const tilesets3 = this.loadTilesets(map3);
        this.layers3 = this.createLayers(map3, tilesets3);

        // Crear jugador y configurar colisiones
        this.player.create();
        this.player.Player.setDepth(15); // Asegúrate de que el jugador esté delante de la capa rocaT

        // Configurar límites de cámara y física del mundo
        this.setupCamera(map3);

        // Escalar el fondo al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background33);
        });

        // Crear enemigos y configurar colisiones
        this.createEnemies();

        // Configurar colisiones entre el jugador y las capas del mapa
        this.configureCollisions();

        // Reproducir la música de fondo
        this.music = this.sound.add('heater', { volume: 0.5, loop: true });
        this.music.play();
    }

    loadTilesets(map3) {
        return [
            map3.addTilesetImage('Cave-BigRocks1', 'Pisos13'),
            map3.addTilesetImage('Cave-Floor', 'Pisos23'),
            map3.addTilesetImage('Cave-Platforms', 'Pisos33'),
            map3.addTilesetImage('Cave-RockCombinations1', 'Pisos43'),
            map3.addTilesetImage('Plant5_00002', 'Pisos53'),
            map3.addTilesetImage('GroupPlants_00010', 'Pisos63'),
            map3.addTilesetImage('Grass2_00010', 'Pisos73'),
            map3.addTilesetImage('Comp_1_00002', 'Pisos83')
        ];
    }

    createLayers(map3, tilesets3) {
        const layers3 = {
            picosT: map3.createLayer('picosT', tilesets3, 0, 0),
            iedras3: map3.createLayer('iedras3', tilesets3, 0, 0),
            rocaT: map3.createLayer('rocaT', tilesets3, 0, 0),
            TerrenoC: map3.createLayer('TerrenoC', tilesets3, 0, 0),
            puerta: map3.createLayer('puerta', tilesets3, 0, 0),
            piedras2: map3.createLayer('piedras2', tilesets3, 0, 0),
            piedras: map3.createLayer('piedras', tilesets3, 0, 0),
            plantas2: map3.createLayer('plantas2', tilesets3.slice(4), 0, 0),
            plantas: map3.createLayer('plantas', tilesets3.slice(4), 0, 0),
            plantas3: map3.createLayer('platas3', tilesets3.slice(4), 0, 0)
        };

        this.scaleRatio3 = Math.max(this.scale.width / map3.widthInPixels, this.scale.height / map3.heightInPixels);

        Object.keys(layers3).forEach(key => {
            const layer3 = layers3[key];
            if (layer3) {
                layer3.setScale(this.scaleRatio3);
                // Configurar colisiones usando propiedades específicas definidas en Tiled
                layer3.setCollisionByProperty({ colision: true });
                layer3.setDepth(this.getLayerDepth(key));
                layer3.setTint(0xff0000); // Aplicar color rojo
            }
        });

        return layers3;
    }

    getLayerDepth(layerKey3) {
        if (layerKey3 === 'rocaT') return 5; // Enviar la capa 'rocaT' detrás de las otras capas
        if (layerKey3.includes('plantas')) return 10;
        if (layerKey3 === 'piedras2') return 20;
        return 15;
    }

    setupCamera(map3) {
        const mapWidth = map3.widthInPixels * this.scaleRatio3;
        const mapHeight = map3.heightInPixels * this.scaleRatio3;
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

        // Configurar la cámara para que siga al jugador en ambos ejes hasta llegar a los límites del mapa
        this.cameras.main.startFollow(this.player.Player, true, 0.1, 0.1);
        this.cameras.main.setDeadzone(this.scale.width * 0.2, this.scale.height * 0.2);
    }

    configureCollisions() {
        // Configurar colisiones entre el jugador y las capas del mapa
        Object.values(this.layers3).forEach(layer3 => {
            if (layer3) {
                this.physics.add.collider(this.player.Player, layer3);
            }
        });

        // Configurar colisiones entre el jugador y los enemigos
        Object.values(this.enemigos3.enemigos3.getChildren()).forEach(enemigo3 => {
            this.physics.add.collider(this.player.Player, enemigo3);
        });

        // Configurar colisiones entre los enemigos y las capas del mapa
        Object.values(this.layers3).forEach(layer3 => {
            if (layer3) {
                this.physics.add.collider(this.enemigos3.enemigos3.getChildren(), layer3);
            }
        });

        if (this.player.barraVida) {
            this.player.barraVida.setDepth(100);
        }
    }

    createEnemies() {
        // Crear enemigos en posiciones específicas
        this.enemigos3.create(200, 450);
        this.enemigos3.create(600, 480);
        this.enemigos3.create(950, 490);
        this.enemigos3.create(1150, 420);
        this.enemigos3.create(1450, 410);
        this.enemigos3.create(1850, 420);
        this.enemigos3.create(2350, 410);
        this.enemigos3.create(2850, 420);
        this.enemigos3.create(3150, 410);
    
        // Ajustar la profundidad de los enemigos y sus barras de vida
        this.enemigos3.enemigos3.getChildren().forEach(enemigo3 => {
            enemigo3.setDepth(25); // Asegúrate de que los enemigos estén delante de las capas del mapa
            if (enemigo3.barraVida) {
                enemigo3.barraVida.setDepth(30); // La barra de vida debe estar incluso delante del enemigo
            }
        });
    }
    scaleBackgroundToFit(background3) {
        const scaleX3 = this.scale.width / background3.width;
        const scaleY3 = this.scale.height / background3.height;
        const scale3 = Math.max(scaleX3, scaleY3);

        background3.setScale(scale3);
        background3.setScrollFactor(0);
        background3.setDepth(-1);
    }

    

    update() {
        // Actualizar lógica de la escena
        this.player.update();
        this.enemigos3.update(this.player.Player.x, this.player.Player.y);
    }
}

export default mapaCueva3;
