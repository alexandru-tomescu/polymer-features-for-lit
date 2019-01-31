# polymer-features-for-lit
Add some features from polymer components to the lit element

## Features are applied to lit elements through mixins.

Mixins exported:
* **Initial values mixin**
> this mixin let you define initial values on the properties instead of write assignments into the constructor. Key used: `initialValue`
* **Computed values mixin**
> this mixin let you declare a string corresponding to a function that gets executed every time one its paramters changes and asssign its value to the property. Key to be used: `computedValue`
* **Observers mixin**
> this mixin aims to provide observers feature, so observers declared in `observers` method will get executed every time one of its parameter will change in the element.

This small library helps projects made with polymer (2,3) to refactor easily to lit element.
