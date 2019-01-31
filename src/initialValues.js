export default Parent =>
  class extends Parent {
    constructor() {
      super();
      Object.keys(this.constructor.properties).forEach(propKey => {
        if (Object.keys(this.constructor.properties[propKey]).includes('initialValue')) {
          this[propKey] = this.constructor.properties[propKey].initialValue;
        }
      })
    }
  }