[![Package quality](http://packagequality.com/shield/ap-validators.svg)](http://packagequality.com/#?package=ap-validators)

# ap-validators

ap-validator is a small JavaScript validation library

## Features

Uses a '[prop-types](https://github.com/facebook/prop-types)' like syntax to declare validation constraints on fields.   
The validation constraints can be checked against the declared object to accept or reject a given value.

```javascript
// Example: building a validator to accept non null strings
const validator = ValidatorTypes.string.isRequired
validator.check()        // will return an object with shape { state: 'ERROR' }
validator.check({})      // will return an object with shape { state: 'ERROR' }
validator.check('test')  // will return an object with shape { state: 'SUCCESS' }
```

## Installation

`npm i --save ap-validators`

## Importing

```javascript
import ValidatorTypes from 'ap-validators' // ES6
var ValidatorTypes = require('ap-validators'); // ES5 with npm
```

Additionnal imports

```javascript
import { STATES } from 'ap-validators' // An object containing all the possible states values as members
import { validators } from 'ap-validators' // A selection of preset validators
```

## Usage

*TBD*

### ValidatorTypes

### Preset validators

## Maintenance

This library was initialy intented for personnal use.   
If you use it and find issues, please create them on the [github issues tracker](https://github.com/ash-uncover/ap-validators/issues).
