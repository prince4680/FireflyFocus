import Phaser from "phaser";

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super("ResultScene");
  }

  create(data: any) {
    const txt = data.success ? "Excellent!" : "Try Again";

    this.add.image(640, 360, "bg").setDisplaySize(1280, 720);
    this.add
      .text(640, 320, txt, {
        fontSize: "60px",
        color: "#ffff66",
      })
      .setOrigin(0.5);

    this.add
      .text(640, 430, "Click Anywhere", {
        fontSize: "30px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}
