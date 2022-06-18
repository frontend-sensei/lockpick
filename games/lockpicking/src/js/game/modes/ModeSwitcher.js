export class ModeSwitcher {
  constructor(options) {
    this.currentMode = options.currentMode
    this.onSetCurrentMode = options.onSetCurrentMode
    this.node = null
    this.nodeSelector = ".mode-switcher"
  }

  init() {
    this.node = document.querySelector(this.nodeSelector)
    if(!this.node) {
      throw new Error(`ModeSwitcher: selector - "${this.nodeSelector}" not found`);
    }
    this.setInitialMode()
    this.registerListeners()
  }

  setInitialMode() {
    const currentModeNode = document.querySelector(`.mode-switcher__input[value="${this.currentMode}"]`)
    if(!currentModeNode) {
      console.log(`ModeSwitcher: currentMode: "${this.currentMode}". currentModeNode not found`)
      return
    }
    currentModeNode.checked = true
  }

  registerListeners() {
    const inputs = this.node.querySelectorAll("input")
    inputs.forEach(input => input.addEventListener("change", (event) => {
      const newCurrentMode = event.target.value
      this.setNewCurrentMode(newCurrentMode)
    }))
  }

  setNewCurrentMode(mode) {
    this.onSetCurrentMode(mode)
  }
}
