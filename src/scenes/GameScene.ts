import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  private fireflies: Phaser.GameObjects.Sprite[] = [];

  private target!: Phaser.GameObjects.Sprite;

  private rTxt!: Phaser.GameObjects.Text;

  private targetRing!: Phaser.GameObjects.Arc;
  private targetTween!: Phaser.Tweens.Tween;
  private canClick = false;
  private level = 1;

  private score = 0;

  private fireflyCount = 6;

  private scoreTxt!: Phaser.GameObjects.Text;

  private levelTxt!: Phaser.GameObjects.Text;

  private countdownTxt!: Phaser.GameObjects.Text;

  constructor() {
    super("GameScene");
  }

  create() {
    this.fireflies = [];

    this.add.image(640, 360, "bg").setDisplaySize(1280, 720);
    this.scoreTxt = this.add.text(30, 30, `Score : ${this.score}`, {
      fontSize: "28px",
      color: "#ffffff",
    });

    this.levelTxt = this.add.text(1050, 30, `Level : ${this.level}`, {
      fontSize: "28px",
      color: "#ffffff",
    });
    this.scoreTxt.setAlpha(1);
    this.levelTxt.setAlpha(1);
    this.add
      .text(640, 50, "Remember the highlighted firefly", {
        fontSize: "34px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.createFireflies();
    this.startCountdown();
    this.time.delayedCall(3000, () => {
      this.canClick = true;

      this.rTxt.destroy();

      this.targetRing.destroy();
      this.tweens.killTweensOf(this.target);
      this.targetTween.remove();
      this.tweens.killTweensOf(this.targetRing);
      this.target.setScale(0.5);
      this.target.setAlpha(1);

      this.startMovement();
    });
  }

  update() {
    if (this.rTxt && this.target && this.rTxt.active) {
      this.rTxt.x = this.target.x;

      this.rTxt.y = this.target.y - 50;
    }

    if (this.targetRing && this.targetRing.active) {
      this.targetRing.x = this.target.x;

      this.targetRing.y = this.target.y;
    }
  }

  private createFireflies() {
    for (let i = 0; i < this.fireflyCount; i++) {
      const ff = this.add.sprite(
        Phaser.Math.Between(150, 1130),

        Phaser.Math.Between(150, 600),

        "firefly",
      );

      ff.play("fly");

      ff.setScale(0.5);

      ff.setInteractive();

      ff.on("pointerdown", () => {
        if (!this.canClick) return;

        this.check(ff);
      });
      ff.disableInteractive();
      this.fireflies.push(ff);
    }

    this.target = Phaser.Utils.Array.GetRandom(this.fireflies);

    //--------------------------------------------------
    // Blue Ring
    //--------------------------------------------------

    this.targetRing = this.add.circle(
      this.target.x,
      this.target.y,
      25,
      0x66ccff,
      0.25,
    );

    this.targetRing.setStrokeStyle(3, 0x66ccff);

    //--------------------------------------------------
    // Remember Text
    //--------------------------------------------------

    this.rTxt = this.add
      .text(this.target.x, this.target.y - 50, "Remember Me!", {
        fontSize: "24px",

        color: "#ffff66",
      })
      .setOrigin(0.5);

    //--------------------------------------------------
    // Pulse Animation
    //--------------------------------------------------

    this.targetTween = this.tweens.add({
      targets: [this.target, this.targetRing],

      scale: 1.15,

      alpha: 0.4,

      yoyo: true,

      repeat: -1,

      duration: 400,
    });
  }
  private startCountdown() {
    let count = 3;

    this.countdownTxt = this.add
      .text(640, 360, "3", {
        fontSize: "120px",
        color: "#ffff66",
      })
      .setOrigin(0.5);

    this.time.addEvent({
      delay: 1000,

      repeat: 2,

      callback: () => {
        count--;

        if (count > 0) {
          this.countdownTxt.setText(count.toString());
        } else {
          this.countdownTxt.destroy();

          this.startMovement();
        }
      },
    });
  }
  private startMovement() {
    this.fireflies.forEach((ff) => {
      this.move(ff);
      ff.setInteractive();
    });
  }

  private move(ff: Phaser.GameObjects.Sprite) {
    this.tweens.add({
      targets: ff,

      x: Phaser.Math.Between(100, 1180),

      y: Phaser.Math.Between(100, 620),

      duration: Phaser.Math.Between(2500, 4000),

      onComplete: () => {
        this.move(ff);
      },
    });
  }

  private check(ff: Phaser.GameObjects.Sprite) {
    const success = ff === this.target;
    if (success) {
      this.score += 10;
      this.level += 1;
    } else {
      if (this.score > 0) {
        this.score -= 5;
      }
    }
    this.scene.start("ResultScene", {
      success,
    });
  }
}
