import { Observable } from "../../utils/observable.js";

export class StandardMode {
  constructor(root) {
    this.attempts = new Observable(3)
  }
}
