import { Observable } from "../../utils/observable";

export class StandardMode {
  constructor(root) {
    this.attempts = new Observable(3)
  }
}
