/**
 * @typedef {Object} Range
 * @property {number} from
 * @property {number} to
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} height
 * @property {number} [TransformStyles.translateY]
 */

/**
 * @typedef {Object} TransformStyles
 * @property {number} [translateY]
 * @property {number} [translateX]
 */

/**
 * Creates a coordinates class
 * @class Coordinates
 */
export class Coordinates {
  constructor(root) {
    this.root = root;
  }

  /**
   * Check whether pointer coordinates matches with safe area coordinates
   * @returns {boolean} Whether the coordinates are correct
   */
  checkPosition() {
    const areaRange = this.getRange(this.root._ui._Bar._ui.areaNode);
    const pointerRange = this.getRange(this.root._ui._Bar._ui.pointerNode);

    if (
      pointerRange.from === areaRange.from ||
      pointerRange.from === areaRange.to ||
      pointerRange.to === areaRange.from ||
      pointerRange.to === areaRange.to
    ) {
      return true;
    }

    if (pointerRange.from < areaRange.from) {
      if (pointerRange.to < areaRange.from) {
        return false;
      }
      if (pointerRange.to > areaRange.from) {
        return true;
      }
    }

    if (pointerRange.from > areaRange.to) {
      return false;
    }
    return true;
  }

  /**
   * @param {HTMLElement} node
   * @returns {Range} Range
   */
  getRange(node) {
    const range = {};
    const styles = this.getCoordinates(node);
    const translateY = styles.translateY;
    const height = styles.height;

    if (!translateY) {
      range.from = 0;
      range.to = height;
    } else {
      range.from = translateY;
      range.to = translateY + height;
    }

    return range;
  }

  /**
   * @param {HTMLElement} node
   * @returns {Coordinates} Coordinates
   */
  getCoordinates(node) {
    return {
      height: node.clientHeight,
      ...this.getTransformProperties(node),
    };
  }

  /**
   * @param {HTMLElement} node
   * @returns {TransformStyles} TransformStyles
   */
  getTransformProperties(node) {
    const transformStyles = {};
    const rawValues = node.style.transform.split(" ");

    if (!rawValues[0]) {
      return {};
    }

    rawValues.forEach((value) => {
      const splittedValue = value.split("(");
      const propertyName = splittedValue[0];
      const propertyValue = +splittedValue[1].slice(0, -1).split("p")[0];
      transformStyles[propertyName] = propertyValue;
    });

    return transformStyles;
  }
}
