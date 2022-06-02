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
   * @public
   * @returns {boolean} Whether the coordinates are correct
   */
  checkPosition() {
    const areaRange = this.getRange(this.root._ui._Bar.areaNode);
    const pointerRange = this.getRange(this.root._ui._Bar.pointerNode);

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
   * @private
   * @param {HTMLElement} node
   * @returns {Range} Range
   */
  getRange(node) {
    const range = {};
    const { translateY, top, height } = this.getCoordinates(node);
    const offset = top || translateY || 0

    range.from = offset;
    range.to = offset + height;

    return range;
  }

  /**
   * @private
   * @param {HTMLElement} node
   * @returns {Coordinates} Coordinates
   */
  getCoordinates(node) {
    return {
      height: node.clientHeight,
      top: this.percentsOf(this.root._ui._Bar.node.clientHeight, +node.style.top.split("%")[0]),
      ...this.getTransformProperties(node),
    };
  }

  percentsOf(target, percents) {
    return target / 100 * percents
  }

  /**
   * @private
   * @param {HTMLElement} node
   * @returns {TransformStyles} TransformStyles
   */
  getTransformProperties(node) {
    const rawValues = node.style.transform.split(" ");

    if (!rawValues[0]) {
      return {};
    }

    const transformStyles = {};
    rawValues.forEach((value) => {
      const splitValue = value.split("(");
      const propertyName = splitValue[0];
      transformStyles[propertyName] = +splitValue[1].slice(0, -1).split("p")[0];
    });

    return transformStyles;
  }
}
