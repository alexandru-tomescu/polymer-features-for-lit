export default Parent =>
  class extends Parent {
    constructor() {
      super();
      const observers = this.constructor.observers;
      if (observers && typeof observers === 'object' && observers.length && observers.length > 0) {
        this.observersConfig = this.checkObservers();
      }
    }

    checkObservers() {
      const observers = [];
      this.constructor.observers.forEach(observerString => {
        const parsedObserverObject = this.parseObserverValueString(observerString);
        if (parsedObserverObject) {
          observers.push(parsedObserverObject)
        }
      })
      return observers;
    }

    updated(changedProperties) {
      super.updated(changedProperties);
      const propsChanged = Array.from(changedProperties.keys());
      if (this.observersConfig && this.observersConfig.length > 0 && propsChanged.length > 0) {
        this.observersConfig.forEach(oc => {
          if (oc.parameters.filter(p => propsChanged.includes(p)).length > 0) {
            if (this[oc.functionName] && typeof this[oc.functionName] === 'function') {
              const paramValues = oc.parameters.map(p => this[p]);
              this[oc.functionName](...paramValues)
            } else {
              console.error(`Observers Mixin: ${oc.functionName} method does not exist`);
            }
          }
        })
      }
    }

    parseObserverValueString(observerString) {
      const regex = /[^,()]+/g;
      const matches = observerString.match(regex);
      return matches && matches.length ? {
        functionName: matches[0],
        parameters: matches.length > 1 ? matches.slice(1).map(s => s.trim()) : []
      } : null;
    }
  }