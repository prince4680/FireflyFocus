import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene");
  }

  create() {
    const bg = this.add.image(640, 360, "bg");

    bg.setScale(Math.max(1280 / bg.width, 720 / bg.height));

    this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.45);

    this.add
      .text(640, 150, "Firefly Focus", {
        fontSize: "60px",
        color: "#ffff99",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    this.add
      .text(640, 230, "Visual Attention & Tracking Game", {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
    for (let i = 0; i < 15; i++) {
      const ff = this.add.sprite(
        Phaser.Math.Between(0, 1280),
        Phaser.Math.Between(0, 720),

        "firefly",
      );

      ff.play("fly");

      ff.setScale(Phaser.Math.FloatBetween(0.2, 0.5));

      this.moveFirefly(ff);
    }

    this.createButtons();
  }
  private moveFirefly(ff: Phaser.GameObjects.Sprite) {
    this.tweens.add({
      targets: ff,

      x: Phaser.Math.Between(0, 1280),

      y: Phaser.Math.Between(0, 720),

      duration: Phaser.Math.Between(4000, 7000),

      onComplete: () => {
        this.moveFirefly(ff);
      },
    });
  }
  private createButtons() {
    const startBtn = this.add
      .rectangle(640, 380, 260, 70, 0x228822)
      .setInteractive();

    this.add
      .text(640, 380, "START", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    startBtn.on("pointerdown", () => {
      this.scene.start("GameScene");
    });
    startBtn.on("pointerover", () => {
      startBtn.setScale(1.1);
    });

    startBtn.on("pointerout", () => {
      startBtn.setScale(1);
    });
    const helpBtn = this.add
      .rectangle(640, 500, 260, 70, 0x3355cc)
      .setInteractive();

    this.add
      .text(640, 500, "HELP", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    helpBtn.on("pointerdown", () => {
      this.showHelp();
    });

    helpBtn.on("pointerover", () => {
      helpBtn.setScale(1.1);
    });

    helpBtn.on("pointerout", () => {
      helpBtn.setScale(1);
    });
  }

  private showHelp() {
    const popup = this.add.container(640, 360);

    const bg = this.add.rectangle(0, 0, 800, 450, 0x000000, 0.9);

    const txt = this.add
      .text(
        0,
        -30,

        `1. Remember the highlighted firefly!.

2. Remember it.

3. Fireflies start moving.

4. Click the same firefly.

Train:
• Visual Attention
• Tracking
• Concentration`,
        {
          fontSize: "28px",
          color: "#ffffff",
          align: "center",
        },
      )
      .setOrigin(0.5);

    const close = this.add
      .text(0, 150, "CLOSE", {
        fontSize: "32px",
        color: "#ffff66",
      })
      .setOrigin(0.5)
      .setInteractive();

    close.on("pointerdown", () => {
      popup.destroy();
    });

    popup.add([bg, txt, close]);
  }
}
