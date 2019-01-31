export default Parent =>
  class extends Parent {
    constructor() {
      super();
      this.computedVariablesMapping = this.checkPropsComputed();
    }

    checkPropsComputed() {
      const computedPropsMapping = {};
      Object.keys(this.constructor.properties).forEach(propKey => {
        if (Object.keys(this.constructor.properties[propKey]).includes('computedValue')) {
          const parsedValue = this.parseComputedValueString(this.constructor.properties[propKey].computedValue);
          if (parsedValue) {
            computedPropsMapping[propKey] = parsedValue
          }
        }
      })
      return computedPropsMapping;
    }

    updated(changedProperties) {
      super.updated(changedProperties);
      const propsChanged = Array.from(changedProperties.keys());
      if (Object.keys(this.computedVariablesMapping).length > 0 && propsChanged.length > 0) {
        Object.keys(this.computedVariablesMapping).forEach(computedProperty => {
          const computedInfo = this.computedVariablesMapping[computedProperty];
          if (computedInfo.parameters.filter(p => propsChanged.includes(p)).length > 0) {
            if (this[computedInfo.functionName] && typeof this[computedInfo.functionName] === 'function') {
              const paramValues = computedInfo.parameters.map(p => this[p]);
              this[computedProperty] = this[computedInfo.functionName](...paramValues)
            } else {
              console.error(`Computed Values Mixin: ${computedInfo.functionName} method does not exist`);
            }
          }
        })
      }
    }

    parseComputedValueString(string) {
      const regex = /[^,()]+/g;
      const matches = string.match(regex);
      return matches && matches.length ? {
        functionName: matches[0],
        parameters: matches.length > 1 ? matches.slice(1).map(s => s.trim()) : []
      } : null;
    }
  }