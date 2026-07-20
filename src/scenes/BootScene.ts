import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.image("bg", "assets/bg/forest_bg.jpg");

    this.load.spritesheet("firefly", "assets/sprites/firefly.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    this.anims.create({
      key: "fly",

      frames: this.anims.generateFrameNumbers("firefly", {
        start: 0,
        end: 15,
      }),

      frameRate: 12,

      repeat: -1,
    });

    this.scene.start("MenuScene");
  }
}
