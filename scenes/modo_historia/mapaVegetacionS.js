import { Player } from "./players/testAnim.js";
import { EnemigoS } from "./players/enemigoS.js";

class mapaVegetacion extends Phaser.Scene {
    constructor() {
        super({ key: 'mapaVegetacion' });
        this.player = null;
        this.layers = {};
        this.enemigos = null;
        this.background = null;
        this.scaleRatio = 1;
        this.music = null; // Para la música de fondo
    }


    preload() {
        // Cargar recursos generales de la escena
        this.load.spritesheet('background2', 'assets/img/bosque_lluvia.png', { frameWidth: 500, frameHeight: 840 });
        this.load.image('Pisos1', 'assets/Mossy-Tileset/Mossy-BackgroundDecoration.png');
        this.load.image('Pisos2', 'assets/Mossy-Tileset/Mossy-Decorations_Hazards.png');
        this.load.image('Pisos3', 'assets/Mossy-Tileset/Mossy-FloatingPlatforms.png');
        this.load.image('Pisos4', 'assets/Mossy-Tileset/Mossy-Hanging_Plants.png');
        this.load.image('Pisos5', 'assets/Mossy-Tileset/Mossy-MossyHills.png');
        this.load.image('Pisos6', 'assets/Mossy-Tileset/Mossy-TileSet.png');
        this.load.tilemapTiledJSON('tilemap', 'scenes/modo_historia/mapaVegetac/mapaVegetacion_2.1.json');

        // Cargar música
        this.load.audio('aventura', 'assets/music/Aventura.mp3');

        // Cargar recursos del jugador
        this.player = new Player(this);
        this.player.preload();

        // Cargar recursos del enemigo
        this.enemigos = new EnemigoS(this);
        this.enemigos.preload();
    }

    create() {
        // Crear elementos de la escena
        this.input.keyboard.on('keydown-P', () => {
            this.scene.launch('PauseScene', { activeMap: 'mapaVegetacion' });
            this.scene.pause();
        });

        // Configurar la tecla 'C' para cambiar a otra escena
        this.input.keyboard.on('keydown-C', () => {
            this.music.stop(); // Detener la música
            this.scene.stop('mapaVegetacion'); // Detener la escena actual
            this.scene.start('scene_cambio1'); // Cambiar a otra escena
        });

        // Crear animaciones para el fondo
        this.anims.create({
            key: 'background3',
            frames: this.anims.generateFrameNumbers('background2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        // Crear el fondo
        this.background = this.add.sprite(0, 0, 'background2').setOrigin(0, 0).play('background3');
        this.scaleBackgroundToFit(this.background);

        // Crear el mapa y las capas
        const map = this.make.tilemap({ key: 'tilemap' });
        const tilesets = this.loadTilesets(map);
        this.layers = this.createLayers(map, tilesets);

        // Crear jugador y configurar colisiones
        this.player.create();
        this.player.Player.setDepth(50); // Asegúrate de que el jugador esté delante de las capas
        this.cameras.main.startFollow(this.player.Player, true, 0.1, 0.1);

        // Configurar límites de cámara y física del mundo
        this.setupCamera(map);

        // Escalar el fondo al cambiar el tamaño de la ventana
        window.addEventListener('resize', () => {
            this.scaleBackgroundToFit(this.background);
        });

        // Crear enemigos y configurar colisiones
        this.createEnemies();

        // Configurar colisiones entre el jugador y las capas del mapa
        this.configureCollisions();

         // Reproducir música
         this.music = this.sound.add('aventura', { volume: 0.5, loop: true });
         this.music.play();
    }

    
    loadTilesets(map) {
        return [
            map.addTilesetImage('Mossy-BackgroundDecoration', 'Pisos1'),
            map.addTilesetImage('Mossy-Decorations_Hazards', 'Pisos2'),
            map.addTilesetImage('Mossy-FloatingPlatforms', 'Pisos3'),
            map.addTilesetImage('Mossy-Hanging_Plants', 'Pisos4'),
            map.addTilesetImage('Mossy-MossyHills', 'Pisos5'),
            map.addTilesetImage('Mossy-TileSet', 'Pisos6')
        ];
    }

    createLayers(map, tilesets) {
        const layers = {
            troncos: map.createLayer('troncos', tilesets, 0, 0),
            Plantas: map.createLayer('Plantas', tilesets, 0, 0),
            Decoracion: map.createLayer('Decoracion', tilesets, 0, 0),
            puerta: map.createLayer('puerta', tilesets, 0, 0),
            Terreno: map.createLayer('Terreno', tilesets, 0, 0),
            detalles: map.createLayer('detalles', tilesets, 0, 0),
            puertaT: map.createLayer('puertaT', tilesets, 0, 0)
        };

        this.scaleRatio = Math.max(this.scale.width / map.widthInPixels, this.scale.height / map.heightInPixels);
        Object.keys(layers).forEach(key => {
            const layer = layers[key];
            if (layer) {
                layer.setScale(this.scaleRatio);
                layer.setCollisionByProperty({ colision: true });
                layer.setDepth(this.getLayerDepth(key));
            }
        });

        return layers;
    }

    getLayerDepth(layerKey) {
        if (layerKey.includes('Plantas')) return 0;
        if (layerKey === 'detalles') return 20;
        return 10;
    }

    setupCamera(map) {
        const mapWidth = map.widthInPixels * this.scaleRatio;
        const mapHeight = map.heightInPixels * this.scaleRatio;
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

        // Ajustar la cámara para seguir al jugador solo en el eje horizontal
        this.cameras.main.setLerp(0.1, 0);
    }

    configureCollisions() {
        Object.values(this.layers).forEach(layer => {
            if (layer) {
                this.physics.add.collider(this.player.Player, layer);
            }
        });

        this.enemigos.enemigos.getChildren().forEach(enemigo => {
            this.physics.add.collider(this.player.Player, enemigo);
        });

        Object.values(this.layers).forEach(layer => {
            if (layer) {
                this.physics.add.collider(this.enemigos.enemigos.getChildren(), layer);
            }
        });

        if (this.player.barraVida) {
            this.player.barraVida.setDepth(100);
        }
    }

    createEnemies() {
        const enemigosConfig = [
            { x: 1300, y: 800 },
            { x: 1600, y: 370 },
            { x: 400, y: 350 },
            { x: 1950, y: 370 },
            { x: 2200, y: 800 },
            { x: 3200, y: 900 },
            { x: 900, y: 1000 },
            { x: 750, y: 540 }
        ];

        enemigosConfig.forEach(config => {
            const enemigo = this.enemigos.create(config.x, config.y);
            enemigo.setDepth(40); // Asegúrate de que los enemigos estén delante de las capas
        });

        this.enemigos.enemigos.getChildren().forEach(enemigo => {
            Object.values(this.layers).forEach(layer => {
                if (layer) {
                    this.physics.add.collider(enemigo, layer);
                }
            });

            this.physics.add.collider(enemigo, this.player.Player, () => this.enemigos.receiveDamage(enemigo, 10));
        });
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
    

    update(time, delta) {
        this.enemigos.update(this.player);
        this.player.update();
    }

    shutdown() {
        // Detener la música al salir de la escena
        if (this.music && this.music.isPlaying) {
            this.music.stop();
        }
    }
}

export default mapaVegetacion;
