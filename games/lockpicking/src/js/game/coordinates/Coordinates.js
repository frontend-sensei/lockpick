/**
 * Creates a coordinates class
 * @class Coordinates
 */
export class Coordinates {
  constructor(root) {
    this.root = root;
  }

  getCoordinates(node) {
    return {
      height: node.clientHeight,
      ...this.getTransformProperties(node),
    };
  }

  checkPosition() {
    const areaStyles = this.getCoordinates(this.root._ui._Bar._ui.barAreaNode);
    const pointerStyles = this.getCoordinates(
      this.root._ui._Bar._ui.barPointerNode
    );

    const areaRange = {};
    const areaTranslateY = areaStyles.translateY;
    const areaHeight = areaStyles.height;

    if (!areaTranslateY) {
      areaRange.from = 0;
      areaRange.to = areaHeight;
    } else {
      areaRange.from = areaTranslateY;
      areaRange.to = areaTranslateY + areaHeight;
    }

    const pointerRange = {};
    const pointerTranslateY = pointerStyles.translateY;
    const pointerHeight = pointerStyles.height;

    if (!pointerTranslateY) {
      pointerRange.from = 0;
      pointerRange.to = pointerHeight;
    } else {
      pointerRange.from = pointerTranslateY;
      pointerRange.to = pointerTranslateY + pointerHeight;
    }

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
