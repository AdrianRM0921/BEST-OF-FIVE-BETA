import { Player } from "./players/testAnim.js";
import { EnemigoS2 } from "./players/enemigoS_2.js";

class CaveMap extends Phaser.Scene {
    constructor() {
        super({ key: 'CaveMap' });
        this.player = null;
        this.layers2 = {};
        this.healthBar = null;
        this.enemigos2 = null;
        this.background22 = null;
        this.scaleRatio2 = 1;
    }

    preload() {
        // Cargar recursos generales de la escena
        this.load.spritesheet('background3', 'assets/img/CAVERNA.png', { frameWidth: 9600 / 5, frameHeight: 3240 / 3 });
        this.load.image('Pisos11', 'assets/Assets_1024_Cave/Cave-BigRocks1.png');
        this.load.image('Pisos21', 'assets/Assets_1024_Cave/Cave-Floor.png');
        this.load.image('Pisos31', 'assets/Assets_1024_Cave/Cave-Platforms.png');
        this.load.image('Pisos41', 'assets/Assets_1024_Cave/Cave-RockCombinations1.png');
        this.load.image('Pisos51', 'assets/Vegetation/Grass5/Plant5_00002.png');
        this.load.image('Pisos61', 'assets/Vegetation/Group_Plant/GroupPlants_00010.png');
        this.load.image('Pisos71', 'assets/Vegetation/Grass2/Grass2_00010.png');
        this.load.image('Pisos81', 'assets/Vegetation/Grass3/Comp_1_00002.png');

        this.load.tilemapTiledJSON('tilemap2', 'scenes/modo_historia/mapaCueva/mapaCueva1.2.json');

        // Cargar música
        this.load.audio('heater2', 'assets/music/Skyrim_Cover.mp3');

        // Cargar recursos del jugador
        this.player = new Player(this);
        this.player.preload();

        // Cargar recursos del enemigo
        this.enemigos2 = new EnemigoS2(this);
        this.enemigos2.preload();
    }

    create() {
        // Crear elementos de la escena
        this.input.keyboard.on('keydown-P', () => {
            this.scene.launch('PauseScene', { activeMap: 'CaveMap' });
            this.scene.pause();
        });

        // Configurar la tecla 'C' para cambiar a otra escena
        this.input.keyboard.on('keydown-C', () => {
            this.music.stop(); // Detener la música
            this.scene.stop('CaveMap'); // Detener la escena actual
            this.scene.start('scene_cambio2'); // Cambiar a otra escena
        });

        // Crear animaciones para el fondo
        this.anims.create({
            key: 'background4',
            frames: this.anims.generateFrameNumbers('background3', { start: 0, end: 7 }),
            frameRate: 6,
            repeat: -1,
        });

        // Crear el fondo
        this.background22 = this.add.sprite(0, 0, 'background3').setOrigin(0, 0).play('background4');
        this.scaleBackgroundToFit(this.background22);

        // Crear el mapa y las capas
        const map2 = this.make.tilemap({ key: 'tilemap2' });
        const tilesets2 = this.loadTilesets(map2);
        this.layers2 = this.createLayers(map2, tilesets2);

        // Crear jugador y configurar colisiones
        this.player.create();
        this.player.Player.setDepth(15); // Asegúrate de que el jugador esté delante de la capa rocaT

        // Configurar límites de cámara y física del mundo
        this.setupCamera(map2);

        // Escalar el fondo al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background22);
        });

        // Crear enemigos y configurar colisiones
        this.createEnemies();

        // Configurar colisiones entre el jugador y las capas del mapa
        this.configureCollisions();
        // Reproducir la música de fondo
        this.music = this.sound.add('heater2', { volume: 0.5, loop: true });
        this.music.play();
    }

    loadTilesets(map2) {
        return [
            map2.addTilesetImage('Cave-BigRocks1', 'Pisos11'),
            map2.addTilesetImage('Cave-Floor', 'Pisos21'),
            map2.addTilesetImage('Cave-Platforms', 'Pisos31'),
            map2.addTilesetImage('Cave-RockCombinations1', 'Pisos41'),
            map2.addTilesetImage('Plant5_00002', 'Pisos51'),
            map2.addTilesetImage('GroupPlants_00010', 'Pisos61'),
            map2.addTilesetImage('Grass2_00010', 'Pisos71'),
            map2.addTilesetImage('Comp_1_00002', 'Pisos81')
        ];
    }

    createLayers(map2, tilesets2) {
        const layers2 = {
            picosT: map2.createLayer('picosT', tilesets2, 0, 0),
            iedras3: map2.createLayer('iedras3', tilesets2, 0, 0),
            rocaT: map2.createLayer('rocaT', tilesets2, 0, 0),
            TerrenoC: map2.createLayer('TerrenoC', tilesets2, 0, 0),
            puerta: map2.createLayer('puerta', tilesets2, 0, 0),
            piedras2: map2.createLayer('piedras2', tilesets2, 0, 0),
            piedras: map2.createLayer('piedras', tilesets2, 0, 0),
            plantas2: map2.createLayer('plantas2', tilesets2.slice(4), 0, 0),
            plantas: map2.createLayer('plantas', tilesets2.slice(4), 0, 0),
            plantas3: map2.createLayer('platas3', tilesets2.slice(4), 0, 0)
        };

        this.scaleRatio2 = Math.max(this.scale.width / map2.widthInPixels, this.scale.height / map2.heightInPixels);

        Object.keys(layers2).forEach(key => {
            const layer2 = layers2[key];
            if (layer2) {
                layer2.setScale(this.scaleRatio2);
                // Configurar colisiones usando propiedades específicas definidas en Tiled
                layer2.setCollisionByProperty({ colision: true });
                layer2.setDepth(this.getLayerDepth(key));
            }
        });

        return layers2;
    }

    getLayerDepth(layerKey2) {
        if (layerKey2 === 'rocaT') return 5; // Enviar la capa 'rocaT' detrás de las otras capas
        if (layerKey2.includes('plantas')) return 10;
        if (layerKey2 === 'piedras2') return 20;
        return 15;
    }

    setupCamera(map2) {
        const mapWidth = map2.widthInPixels * this.scaleRatio2;
        const mapHeight = map2.heightInPixels * this.scaleRatio2;
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

        // Configurar la cámara para que siga al jugador
        this.cameras.main.startFollow(this.player.Player, true, 0.1, 0.1);
    }

    configureCollisions() {
        // Configurar colisiones entre el jugador y las capas del mapa
        Object.values(this.layers2).forEach(layer2 => {
            if (layer2) {
                this.physics.add.collider(this.player.Player, layer2);
            }
        });

        // Configurar colisiones entre el jugador y los enemigos
        Object.values(this.enemigos2.enemigos2.getChildren()).forEach(enemigo2 => {
            this.physics.add.collider(this.player.Player, enemigo2);
        });

        // Configurar colisiones entre los enemigos y las capas del mapa
        Object.values(this.layers2).forEach(layer2 => {
            if (layer2) {
                this.physics.add.collider(this.enemigos2.enemigos2.getChildren(), layer2);
            }
        });

        if (this.player.barraVida) {
            this.player.barraVida.setDepth(100);
        }

        // Asegurarse de que los enemigos estén siempre en la parte superior
        this.enemigos2.enemigos2.getChildren().forEach(enemigo2 => {
            enemigo2.setDepth(25); // Profundidad alta para los enemigos
        });
    }

    createEnemies() {
        // Crear enemigos en posiciones específicas
        const posiciones = [
            { x: 300, y: 920 },
            { x: 600, y: 920 },
            { x: 950, y: 730 },
            { x: 1150, y: 620 },
            { x: 1300, y: 620 },
            { x: 1450, y: 620 },
            { x: 1850, y: 920 },
            { x: 1950, y: 920 },
            { x: 2550, y: 920 },
            { x: 2750, y: 650 },
            { x: 3350, y: 610 },
            { x: 3150, y: 650 },
            { x: 3850, y: 650 },
            { x: 3600, y: 650 },
        ];
    
        posiciones.forEach(pos => {
            const enemigo = this.enemigos2.create(pos.x, pos.y);
            enemigo.setDepth(25); // Profundidad alta para los enemigos
    
            if (enemigo.barraVida) {
                enemigo.barraVida.setDepth(26); // Establece la profundidad de la barra de vida para que esté delante del enemigo
            }
        });
    }

    scaleBackgroundToFit(background22) {
        if (background22 && background22.width && background22.height) {
            const camera = this.cameras.main;
            const scaleX = camera.width / background22.width;
            const scaleY = camera.height / background22.height;
            background22.setScale(Math.max(scaleX, scaleY)).setScrollFactor(0);
        }
    }


    update(time, delta) {
        // Actualizar el estado del jugador y los enemigos en cada cuadro
        this.player.update();
        this.enemigos2.update(this.player.Player);
    }

    shutdown() {
        // Detener la música al salir de la escena
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }
    }}

export default CaveMap;
