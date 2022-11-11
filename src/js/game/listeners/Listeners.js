import { MobileListeners } from "./MobileListeners.js";
import { DesktopListeners } from "./DesktopListeners.js";

/**
 * Create Listeners contoller
 * @class Listeners
 */
export class Listeners {
  constructor(listener, isMobile, mobileNode) {
    this.listenerTarget = isMobile
      ? new MobileListeners(listener, mobileNode)
      : new DesktopListeners(listener);

    return this.listenerTarget;
  }
}
