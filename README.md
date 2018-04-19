[![Package quality](http://packagequality.com/shield/ap-validators.svg)](http://packagequality.com/#?package=ap-validators)

# ap-validators

ap-validator is a small JavaScript validation library

## Features

Uses a 'prop-types' like syntax to declare validation constraints on fields.   
The validation constraints can be checked again the declared object to accept or reject a given value.

```
// Example: building a validator to accept non null strings
const validator = ValidatorTypes.string.isRequired
validator.check()        // will return an object with shape { state: 'ERROR' }
validator.check({})      // will return an object with shape { state: 'ERROR' }
validator.check('test')  // will return an object with shape { state: 'SUCCESS' }
```

## Installation

`npm i --save ap-validators`

## Usage

*TBD*

### ValidatorTypes

### Preset validators

## Maintenance

This library was initialy intented for personnal use.   
If you use it and find issues, please create them on the [github issues tracker](https://github.com/ash-uncover/ap-validators/issues).
