[1mdiff --git a/games/lockpicking/src/js/components/Popup.js b/games/lockpicking/src/js/components/Popup.js[m
[1mindex 80e4e0f..8e4502b 100644[m
[1m--- a/games/lockpicking/src/js/components/Popup.js[m
[1m+++ b/games/lockpicking/src/js/components/Popup.js[m
[36m@@ -59,8 +59,8 @@[m [mexport class Popup {[m
     const listeners = this.options.listeners || {};[m
     Object.entries(listeners).forEach((listenerData) => {[m
       const [id, listener] = listenerData;[m
[32m+[m[32m      console.log(elx);[m
       const el = document.querySelector(this.getSelector(`#${id}`));[m
[31m-      console.log(el);[m
       if (!el) {[m
         console.error(`Element with id: "${id} not found"`);[m
         return;[m
[1mdiff --git a/games/lockpicking/src/js/game/Game.js b/games/lockpicking/src/js/game/Game.js[m
[1mindex f967b06..3be62c9 100644[m
[1m--- a/games/lockpicking/src/js/game/Game.js[m
[1m+++ b/games/lockpicking/src/js/game/Game.js[m
[36m@@ -57,6 +57,17 @@[m [mexport class Game {[m
     );[m
   }[m
 [m
[32m+[m[32m  mobileUnlockHandler(event) {[m
[32m+[m[32m    this.unlockHandler(event);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  desktopUnlockHandler(event) {[m
[32m+[m[32m    if (!this._keyboard.isSpacePressed(event)) {[m
[32m+[m[32m      return;[m
[32m+[m[32m    }[m
[32m+[m[32m    this.unlockHandler(event);[m
[32m+[m[32m  }[m
[32m+[m
   render() {[m
     this._ui.render(".game-page");[m
   }[m
[36m@@ -65,20 +76,20 @@[m [mexport class Game {[m
     await new Countdown(this).start();[m
     this._listeners.register();[m
     this._timer.start();[m
[31m-    this._ui._Bar._ui.movePointer();[m
[32m+[m[32m    this._ui._Bar.movePointer();[m
     this._ui._Lockpick.animate();[m
   }[m
 [m
   stop() {[m
     this._timer.stop();[m
     this._listeners.remove();[m
[31m-    this._ui._Bar._ui.stopPointer();[m
[32m+[m[32m    this._ui._Bar.stopPointer();[m
     this._ui._Lockpick.stopAnimate();[m
   }[m
 [m
   onDefeat() {[m
     this._listeners.remove();[m
[31m-    this._ui._Bar._ui.stopPointer();[m
[32m+[m[32m    this._ui._Bar.stopPointer();[m
     this.gameOver();[m
   }[m
 [m
[36m@@ -109,18 +120,15 @@[m [mexport class Game {[m
       this.pendingHandler = true;[m
 [m
       this._timer.pause();[m
[31m-      this._ui._Bar._ui.stopPointer();[m
[32m+[m[32m      this._ui._Bar.stopPointer();[m
 [m
       const positionCorrect = this._coordinates.checkPosition();[m
       if (!positionCorrect) {[m
[31m-        this.positionIncorrectHandler();[m
[32m+[m[32m        this.incorrectPositionHandler();[m
       }[m
 [m
       if (positionCorrect) {[m
[31m-        this.sounds.unlocked.play();[m
[31m-        this._ui._Lockpick.stopAnimate();[m
[31m-        this.pinsUnlocked++;[m
[31m-        this._ui._Pins.updateUnlocked(this.pinsUnlocked);[m
[32m+[m[32m        this.correctPositionHandler();[m
       }[m
 [m
       if (this.pinsUnlocked === this.level.steps) {[m
[36m@@ -133,13 +141,7 @@[m [mexport class Game {[m
         throw new Error();[m
       }[m
 [m
[31m-      const tipIcon = document.querySelector(".unlock-label__img");[m
[31m-      if (tipIcon) {[m
[31m-        tipIcon.classList.add("unlock-label__img--active");[m
[31m-        setTimeout(() => {[m
[31m-          tipIcon.classList.remove("unlock-label__img--active");[m
[31m-        }, 100);[m
[31m-      }[m
[32m+[m[32m      this.animateTip();[m
 [m
       setTimeout(() => {[m
         this.continue();[m
[36m@@ -149,36 +151,42 @@[m [mexport class Game {[m
     }[m
   }[m
 [m
[31m-  positionIncorrectHandler() {[m
[32m+[m[32m  incorrectPositionHandler() {[m
     this.sounds.failed.play();[m
     this.barFailure();[m
     this.attempts.set(this.attempts.value - 1);[m
   }[m
 [m
[32m+[m[32m  correctPositionHandler() {[m
[32m+[m[32m    this.sounds.unlocked.play();[m
[32m+[m[32m    this._ui._Lockpick.stopAnimate();[m
[32m+[m[32m    this.pinsUnlocked++;[m
[32m+[m[32m    this._ui._Pins.updateUnlocked(this.pinsUnlocked);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  animateTip() {[m
[32m+[m[32m    const tipIcon = document.querySelector(".unlock-label__img");[m
[32m+[m[32m    if (tipIcon) {[m
[32m+[m[32m      tipIcon.classList.add("unlock-label__img--active");[m
[32m+[m[32m      setTimeout(() => {[m
[32m+[m[32m        tipIcon.classList.remove("unlock-label__img--active");[m
[32m+[m[32m      }, 100);[m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
[32m+[m
   barFailure() {[m
[31m-    this._ui._Bar._ui.node.classList.add("bar--failure");[m
[32m+[m[32m    this._ui._Bar.node.classList.add("bar--failure");[m
     this._ui._Lockpick.node.classList.add("failure");[m
     setTimeout(() => {[m
[31m-      this._ui._Bar._ui.node.classList.remove("bar--failure");[m
[32m+[m[32m      this._ui._Bar.node.classList.remove("bar--failure");[m
       this._ui._Lockpick.node.classList.remove("failure");[m
     }, this.PAUSE_TIMEOUT - 150);[m
   }[m
 [m
   continue() {[m
     this._timer.start();[m
[31m-    this._ui._Bar._ui.movePointer();[m
[32m+[m[32m    this._ui._Bar.movePointer();[m
     this._ui._Lockpick.animate();[m
     this.pendingHandler = false;[m
   }[m
[31m-[m
[31m-  mobileUnlockHandler(event) {[m
[31m-    this.unlockHandler(event);[m
[31m-  }[m
[31m-[m
[31m-  desktopUnlockHandler(event) {[m
[31m-    if (!this._keyboard.isSpacePressed(event)) {[m
[31m-      return;[m
[31m-    }[m
[31m-    this.unlockHandler(event);[m
[31m-  }[m
 }[m
[1mdiff --git a/games/lockpicking/src/js/game/bar/Bar.js b/games/lockpicking/src/js/game/bar/Bar.js[m
[1mindex 4bf97b9..76a7162 100644[m
[1m--- a/games/lockpicking/src/js/game/bar/Bar.js[m
[1m+++ b/games/lockpicking/src/js/game/bar/Bar.js[m
[36m@@ -1,12 +1,124 @@[m
[31m-import { BarUI } from "./BarUI.js";[m
[31m-[m
 export class Bar {[m
   constructor(root) {[m
     this.root = root;[m
[31m-    this._ui = new BarUI(root);[m
[32m+[m[32m    this.node = null;[m
[32m+[m[32m    this.areaNode = null;[m
[32m+[m[32m    this.pointerNode = null;[m
[32m+[m[32m    this.inertvalId = null;[m
[32m+[m[32m    this.barLength = 700;[m
[32m+[m[32m    this.areaHeight = this.root.level.areaHeight;[m
[32m+[m[32m    this.pointerLength = 25;[m
[32m+[m[32m    this.translateY = 0;[m
[32m+[m[32m    this.movementDirection = "bottom";[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  getHTML() {[m
[32m+[m[32m    return `[m
[32m+[m[32m    <div class="bar">[m
[32m+[m[32m      <div class="bar-body__side bar-body__side-back"></div>[m
[32m+[m[32m      <div class="bar-body__side bar-body__side-front"></div>[m
[32m+[m[32m      <div class="bar-body__side bar-body__side-left"></div>[m
[32m+[m[32m      <div class="bar-body__side bar-body__side-right"></div>[m
[32m+[m[32m      <div class="bar-body__side bar-body__side-top"></div>[m
[32m+[m[32m      <div class="bar-body__side bar-body__side-bottom"></div>[m
[32m+[m[32m      <div class="bar__area">[m
[32m+[m[32m        <div class="bar-area__side bar-area__side-back">[m
[32m+[m[32m          <div class="bar-area-extra__side bar-area-extra__side-back"></div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m        <div class="bar-area__side bar-area__side-front">[m
[32m+[m[32m          <div class="bar-area-extra__side bar-area-extra__side-front"></div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m        <div class="bar-area__side bar-area__side-left">[m
[32m+[m[32m          <div class="bar-area-extra__side bar-area-extra__side-left"></div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m        <div class="bar-area__side bar-area__side-right">[m
[32m+[m[32m          <div class="bar-area-extra__side bar-area-extra__side-right"></div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </div>[m
[32m+[m[32m      <div class="bar__pointer">[m
[32m+[m[32m        <div class="bar-pointer__side bar-pointer__side-back"></div>[m
[32m+[m[32m        <div class="bar-pointer__side bar-pointer__side-front"></div>[m
[32m+[m[32m        <div class="bar-pointer__side bar-pointer__side-left"></div>[m
[32m+[m[32m        <div class="bar-pointer__side bar-pointer__side-right"></div>[m
[32m+[m[32m      </div>[m
[32m+[m[32m    </div>[m
[32m+[m[32m    `;[m
   }[m
 [m
   render(selector) {[m
[31m-    this._ui.render(selector);[m
[32m+[m[32m    const element = document.createElement("div");[m
[32m+[m[32m    element.innerHTML = this.getHTML();[m
[32m+[m[32m    element.className = "bar-wrapper";[m
[32m+[m[32m    const wrapper = document.querySelector(selector);[m
[32m+[m[32m    if (!wrapper) {[m
[32m+[m[32m      throw new Error(`GameBarUI: selector - "${selector}" not found`);[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    wrapper.appendChild(element);[m
[32m+[m
[32m+[m[32m    this.node = document.querySelector(".bar-wrapper");[m
[32m+[m[32m    this.areaNode = document.querySelector(".bar__area");[m
[32m+[m[32m    this.pointerNode = document.querySelector(".bar__pointer");[m
[32m+[m
[32m+[m[32m    this.node.style.setProperty("--body-length", `${this.barLength}px`);[m
[32m+[m[32m    this.node.style.setProperty("--area-length-percents", this.areaHeight);[m
[32m+[m[32m    this.node.style.setProperty("--pointer-length", `${this.pointerLength}px`);[m
[32m+[m
[32m+[m[32m    this.calcHeightForTouchDevice();[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  calcHeightForTouchDevice() {[m
[32m+[m[32m    if (!this.root.isMobile) {[m
[32m+[m[32m      return;[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    setTimeout(() => {[m
[32m+[m[32m      let lockpickHeight = 0;[m
[32m+[m[32m      if (window.innerWidth < 768) {[m
[32m+[m[32m        lockpickHeight = document.querySelector(".lockpick").clientHeight;[m
[32m+[m[32m      }[m
[32m+[m
[32m+[m[32m      const barStyles = getComputedStyle(this.node.parentNode);[m
[32m+[m[32m      const marginsY =[m
[32m+[m[32m        +barStyles.marginTop.split("px")[0] +[m
[32m+[m[32m        +barStyles.marginBottom.split("px")[0];[m
[32m+[m
[32m+[m[32m      const viewportHeight = window.innerHeight;[m
[32m+[m[32m      const additionalOffset = 20;[m
[32m+[m[32m      const height =[m
[32m+[m[32m        viewportHeight - lockpickHeight - marginsY - additionalOffset;[m
[32m+[m
[32m+[m[32m      this.barLength = height;[m
[32m+[m[32m      this.node.style.setProperty("--body-length", `${this.barLength}px`);[m
[32m+[m[32m    });[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  movePointer() {[m
[32m+[m[32m    const movementSpeed = 12;[m
[32m+[m[32m    const maxTranslateY = this.barLength - this.pointerLength;[m
[32m+[m[32m    const minTranslateY = 0;[m
[32m+[m
[32m+[m[32m    this.inertvalId = setInterval(() => {[m
[32m+[m[32m      if (this.movementDirection === "bottom") {[m
[32m+[m[32m        if (this.translateY >= maxTranslateY) {[m
[32m+[m[32m          this.translateY = maxTranslateY;[m
[32m+[m[32m          this.movementDirection = "top";[m
[32m+[m[32m          return;[m
[32m+[m[32m        }[m
[32m+[m[32m        this.translateY += movementSpeed;[m
[32m+[m[32m      } else if (this.movementDirection === "top") {[m
[32m+[m[32m        if (this.translateY <= minTranslateY) {[m
[32m+[m[32m          this.translateY = minTranslateY;[m
[32m+[m[32m          this.movementDirection = "bottom";[m
[32m+[m[32m          return;[m
[32m+[m[32m        }[m
[32m+[m[32m        this.translateY -= movementSpeed;[m
[32m+[m[32m      }[m
[32m+[m[32m      this.pointerNode.style.transform = `translateY(${this.translateY}px)`;[m
[32m+[m[32m    }, 16);[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  stopPointer() {[m
[32m+[m[32m    this.inertvalId = clearInterval(this.inertvalId);[m
   }[m
 }[m
[1mdiff --git a/games/lockpicking/src/js/game/bar/BarUI.js b/games/lockpicking/src/js/game/bar/BarUI.js[m
[1mdeleted file mode 100644[m
[1mindex 223d80a..0000000[m
[1m--- a/games/lockpicking/src/js/game/bar/BarUI.js[m
[1m+++ /dev/null[m
[36m@@ -1,128 +0,0 @@[m
[31m-/**[m
[31m- * Creates a new BarUI[m
[31m- * @class BarUI[m
[31m- */[m
[31m-export class BarUI {[m
[31m-  constructor(root) {[m
[31m-    this.root = root;[m
[31m-    this.node = null;[m
[31m-    this.areaNode = null;[m
[31m-    this.pointerNode = null;[m
[31m-    this.inertvalId = null;[m
[31m-    this.barLength = 700;[m
[31m-    this.areaHeight = this.root.level.areaHeight;[m
[31m-    this.pointerLength = 25;[m
[31m-    this.translateY = 0;[m
[31m-    this.movementDirection = "bottom";[m
[31m-  }[m
[31m-[m
[31m-  getHTML() {[m
[31m-    return `[m
[31m-    <div class="bar">[m
[31m-      <div class="bar-body__side bar-body__side-back"></div>[m
[31m-      <div class="bar-body__side bar-body__side-front"></div>[m
[31m-      <div class="bar-body__side bar-body__side-left"></div>[m
[31m-      <div class="bar-body__side bar-body__side-right"></div>[m
[31m-      <div class="bar-body__side bar-body__side-top"></div>[m
[31m-      <div class="bar-body__side bar-body__side-bottom"></div>[m
[31m-      <div class="bar__area">[m
[31m-        <div class="bar-area__side bar-area__side-back">[m
[31m-          <div class="bar-area-extra__side bar-area-extra__side-back"></div>[m
[31m-        </div>[m
[31m-        <div class="bar-area__side bar-area__side-front">[m
[31m-          <div class="bar-area-extra__side bar-area-extra__side-front"></div>[m
[31m-        </div>[m
[31m-        <div class="bar-area__side bar-area__side-left">[m
[31m-          <div class="bar-area-extra__side bar-area-extra__side-left"></div>[m
[31m-        </div>[m
[31m-        <div class="bar-area__side bar-area__side-right">[m
[31m-          <div class="bar-area-extra__side bar-area-extra__side-right"></div>[m
[31m-        </div>[m
[31m-      </div>[m
[31m-      <div class="bar__pointer">[m
[31m-        <div class="bar-pointer__side bar-pointer__side-back"></div>[m
[31m-        <div class="bar-pointer__side bar-pointer__side-front"></div>[m
[31m-        <div class="bar-pointer__side bar-pointer__side-left"></div>[m
[31m-        <div class="bar-pointer__side bar-pointer__side-right"></div>[m
[31m-      </div>[m
[31m-    </div>[m
[31m-    `;[m
[31m-  }[m
[31m-[m
[31m-  render(selector) {[m
[31m-    const element = document.createElement("div");[m
[31m-    element.innerHTML = this.getHTML();[m
[31m-    element.className = "bar-wrapper";[m
[31m-    const wrapper = document.querySelector(selector);[m
[31m-    if (!wrapper) {[m
[31m-      throw new Error(`GameBarUI: selector - "${selector}" not found`);[m
[31m-    }[m
[31m-[m
[31m-    wrapper.appendChild(element);[m
[31m-[m
[31m-    this.node = document.querySelector(".bar-wrapper");[m
[31m-    this.areaNode = document.querySelector(".bar__area");[m
[31m-    this.pointerNode = document.querySelector(".bar__pointer");[m
[31m-[m
[31m-    this.node.style.setProperty("--body-length", `${this.barLength}px`);[m
[31m-    this.node.style.setProperty("--area-length-percents", this.areaHeight);[m
[31m-    this.node.style.setProperty("--pointer-length", `${this.pointerLength}px`);[m
[31m-[m
[31m-    this.calcHeightForTouchDevice();[m
[31m-  }[m
[31m-[m
[31m-  calcHeightForTouchDevice() {[m
[31m-    if (!this.root.isMobile) {[m
[31m-      return;[m
[31m-    }[m
[31m-[m
[31m-    setTimeout(() => {[m
[31m-      let lockpickHeight = 0;[m
[31m-      if (window.innerWidth < 768) {[m
[31m-        lockpickHeight = document.querySelector(".lockpick").clientHeight;[m
[31m-      }[m
[31m-[m
[31m-      const barStyles = getComputedStyle(this.node.parentNode);[m
[31m-      const marginsY =[m
[31m-        +barStyles.marginTop.split("px")[0] +[m
[31m-        +barStyles.marginBottom.split("px")[0];[m
[31m-[m
[31m-      const viewportHeight = window.innerHeight;[m
[31m-      const additionalOffset = 20;[m
[31m-      const height =[m
[31m-        viewportHeight - lockpickHeight - marginsY - additionalOffset;[m
[31m-[m
[31m-      this.barLength = height;[m
[31m-      this.node.style.setProperty("--body-length", `${this.barLength}px`);[m
[31m-    });[m
[31m-  }[m
[31m-[m
[31m-  movePointer() {[m
[31m-    const movementSpeed = 12;[m
[31m-    const maxTranslateY = this.barLength - this.pointerLength;[m
[31m-    const minTranslateY = 0;[m
[31m-[m
[31m-    this.inertvalId = setInterval(() => {[m
[31m-      if (this.movementDirection === "bottom") {[m
[31m-        if (this.translateY >= maxTranslateY) {[m
[31m-          this.translateY = maxTranslateY;[m
[31m-          this.movementDirection = "top";[m
[31m-          return;[m
[31m-        }[m
[31m-        this.translateY += movementSpeed;[m
[31m-      } else if (this.movementDirection === "top") {[m
[31m-        if (this.translateY <= minTranslateY) {[m
[31m-          this.translateY = minTranslateY;[m
[31m-          this.movementDirection = "bottom";[m
[31m-          return;[m
[31m-        }[m
[31m-        this.translateY -= movementSpeed;[m
[31m-      }[m
[31m-      this.pointerNode.style.transform = `translateY(${this.translateY}px)`;[m
[31m-    }, 16);[m
[31m-  }[m
[31m-[m
[31m-  stopPointer() {[m
[31m-    this.inertvalId = clearInterval(this.inertvalId);[m
[31m-  }[m
[31m-}[m
[1mdiff --git a/games/lockpicking/src/js/game/coordinates/Coordinates.js b/games/lockpicking/src/js/game/coordinates/Coordinates.js[m
[1mindex b3eb5d4..3741908 100644[m
[1m--- a/games/lockpicking/src/js/game/coordinates/Coordinates.js[m
[1m+++ b/games/lockpicking/src/js/game/coordinates/Coordinates.js[m
[36m@@ -31,8 +31,8 @@[m [mexport class Coordinates {[m
    * @returns {boolean} Whether the coordinates are correct[m
    */[m
   checkPosition() {[m
[31m-    const areaRange = this.getRange(this.root._ui._Bar._ui.areaNode);[m
[31m-    const pointerRange = this.getRange(this.root._ui._Bar._ui.pointerNode);[m
[32m+[m[32m    const areaRange = this.getRange(this.root._ui._Bar.areaNode);[m
[32m+[m[32m    const pointerRange = this.getRange(this.root._ui._Bar.pointerNode);[m
 [m
     if ([m
       pointerRange.from === areaRange.from ||[m
