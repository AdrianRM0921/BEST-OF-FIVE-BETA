
import BackgroundScene from './scene_fondo.js';
import MainMenuScene from './scene_menu_principal.js';
import loreGameScene from'./modo_historia/scena_cambio/scena_lore.js'
import scene_menuOPC2 from'../scenes/pausa/menuOpciones/scene_menuOPC2.js';
import scene_cambio1 from './modo_historia/scena_cambio/scene_cambio1.js'
import scene_cambio2 from './modo_historia/scena_cambio/scene_cambio2.js'
import scene_cambio3 from './modo_historia/scena_cambio/scene_cambio3.js'
import mapaVegetacion from './modo_historia/mapaVegetacionS.js';
import CaveMap from './modo_historia/mapaCuevaS.js';
import mapaCueva3 from './modo_historia/mapaCueva3.js';
import PauseScene from './pausa/scene_pausa.js';
import scene_menuOPC from'../scenes/pausa/menuOpciones/scene_menuOPC.js';
import GameOverScene from'./modo_historia/players/scene_over.js'
import CharacterSelectionScene from './modo_campal/Scene_seleccion/seleccion.js';
import SceneSuspendido from'./modo_campal/scenaSupendido.js';
import EndGameScene from './modo_historia/scena_cambio/scena_Final.js'

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
    },
    input: {
        gamepad: true // Asegúrate de que esto esté habilitado
    },
    scene: [BackgroundScene, MainMenuScene,loreGameScene,scene_menuOPC2,EndGameScene, mapaVegetacion,scene_cambio1, CaveMap ,scene_cambio2, mapaCueva3,scene_cambio3, PauseScene,scene_menuOPC, GameOverScene, CharacterSelectionScene, SceneSuspendido],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        
        }
        
    }
};

const game = new Phaser.Game(config);
