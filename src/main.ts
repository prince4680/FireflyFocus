import "./style.css";

import Phaser from "phaser";

import BootScene from "./scenes/BootScene";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";
import ResultScene from "./scenes/ResultScene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  parent: "app",

  width: 1280,
  height: 720,

  backgroundColor: "#000000",

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  scene: [BootScene, MenuScene, GameScene, ResultScene],
};

new Phaser.Game(config);
