# validator

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/validator)

This is a lightweight validator for Node.JS.
It can validate the input string or number based on the rules you defined.

[![CI](https://github.com/sumor-cloud/validator/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/validator/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/validator/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/validator/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/validator/actions/workflows/audit.yml)

## Installation

```bash
npm i @sumor/validator --save
```

## Prerequisites

### Node.JS version

Require Node.JS version 16.x or above

### require Node.JS ES module

As this package is written in ES module,
please change the following code in your `package.json` file:

```json
{
  "type": "module"
}
```

## Usage

### Basic Usage

```js
import { validate, format } from '@sumor/validator'

const parameterDefinition = {
  // please refer to the following section for the detail
  rule: [
    {
      code: 'ONLY_CHAR_DIGIT',
      expression: '^[a-zA-Z0-9]*$',
      message: 'only allow a-z, A-Z, 0-9'
    }
  ]
}

// validate the input, return the error message
const messages = validate(parameterDefinition, 'de1234567')
console.log(messages) // [ 'only allow a-z, A-Z, 0-9' ]

// format the input, return the formatted value
const value = format(parameterDefinition, ' demo ')
console.log(value) // will print "demo", useless space will be removed
```

### Parameter Definition

- [optional] `type` data type, support `string`, `number`,`array`,`file`, default is `string`
- [optional] `required` required or not, default is false
- [optional] `length` length of the string, default is 0 means no limit
- [optional] `default` default value, default is null
- [optional] `rule` rule for the validation, default is empty array, please refer to the following section for the detail
- [optional] `trim` trim the string or not, default is true for string type
- [optional] `lowerCase` convert the string to lowercase or not, default is false
- [optional] `upperCase` convert the string to uppercase or not, default is false
- [optional] `decimal` decimal for the number, default is null, 0 means no decimal
- [optional] `i18n` i18n for the error message, default is empty object, please refer to the following section for the detail
- [optional] `error` output error or not, default is false

for array type, `rule`, `default`, `trim`, `lowerCase`, `upperCase`, `decimal` are working for each item in the array.
for file type, `rule` is working for the file object.

### Rule Definition

- `code` identifier for the rule, translate message based on this code
- `message` original message for the rule
- [optional] `expression` rule expression, should be a regular expression
- [optional] `function` rule function, should be a function, return true if pass the rule

```js
// argument for the function
// value: the value for the parameter
// info: the parameter definition
// language: current language
;(value, info, language) => {
  return value > 5
}
```

### I18n Definition

Structure should be like the following:

```json
{
  "language": {
    "code": "message"
  }
}
```

- `language` language code, support `en`, `zh`, `zh-TW` and so on
- `code` identifier for the rule, should be the same as the rule code
- `message` translated message for the rule

### Validate String Usage

```js
import { validate } from '@sumor/validator'

const parameterDefinition = {
  type: 'string',
  required: true,
  length: 10,
  rule: [
    // only allow a-z, A-Z, 0-9
    {
      code: 'ONLY_CHAR_DIGIT',
      expression: '^[a-zA-Z0-9]*$',
      message: 'only allow a-z, A-Z, 0-9'
    },
    // need include demo
    {
      code: 'INCLUDE_DEMO',
      expression: 'demo',
      message: 'need include demo'
    },
    // use function to check
    {
      code: 'LENGTH_GREATER_THAN_5',
      function: value => {
        return value.length > 5
      },
      message: 'length should be greater than 5'
    }
  ],
  i18n: {
    zh: {
      ONLY_CHAR_DIGIT: '只允许输入字母和数字',
      INCLUDE_DEMO: '需要包含demo',
      LENGTH_GREATER_THAN_5: '长度应大于5'
    },
    'zh-TW': {
      ONLY_CHAR_DIGIT: '只允許輸入字母和數字',
      INCLUDE_DEMO: '需要包含demo',
      LENGTH_GREATER_THAN_5: '長度應大於5'
    }
  }
}

const messages1 = validate(parameterDefinition, 'demo123456')
console.log(messages1) // []

const messages2 = validate(parameterDefinition, 'de1234567')
console.log(messages2) // [ 'only allow a-z, A-Z, 0-9' ]

const messages3 = validate(parameterDefinition, 'demo!')
console.log(messages3) // [ 'only allow a-z, A-Z, 0-9', 'need include demo' ]

const messages4 = validate(parameterDefinition, 'de!mo')
console.log(messages4) // [ 'only allow a-z, A-Z, 0-9', 'need include demo' ]

const messages5 = validate(parameterDefinition, 'de')
console.log(messages5) // [ 'only allow a-z, A-Z, 0-9', 'need include demo', 'length should be greater than 5' ]

// translate to zh
const messages6 = validate(parameterDefinition, 'de', 'zh')
console.log(messages6) // [ '只允许输入字母和数字', '需要包含demo', '长度应大于5' ]

// translate to zh-TW
const messages7 = validate(parameterDefinition, 'de', 'zh-TW')
console.log(messages7) // [ '只允許輸入字母和數字', '需要包含demo', '長度應大於5' ]
```

### Validate Number Usage

```js
import { validate } from '@sumor/validator'

const parameterDefinition = {
  type: 'number',
  required: true,
  rule: [
    // need greater than 5
    {
      code: 'GREATER_THAN_5',
      function: value => {
        return value > 5
      },
      message: 'value should be greater than 5'
    }
  ],
  i18n: {
    zh: {
      GREATER_THAN_5: '值应大于5'
    },
    'zh-TW': {
      GREATER_THAN_5: '值應大於5'
    }
  }
}

const messages1 = validate(parameterDefinition, 6)
console.log(messages1) // []

const messages2 = validate(parameterDefinition, 5)
console.log(messages2) // [ 'value should be greater than 5' ]

const messages3 = validate(parameterDefinition, 4)
console.log(messages3) // [ 'value should be greater than 5' ]

// translate to zh
const messages4 = validate(parameterDefinition, 4, 'zh')
console.log(messages4) // [ '值应大于5' ]

// translate to zh-TW
const messages5 = validate(parameterDefinition, 4, 'zh-TW')
console.log(messages5) // [ '值應大於5' ]
```

### Validate Array Usage

```js
import { validate } from '@sumor/validator'

const parameterDefinition = {
  type: 'array',
  required: true,
  length: 3,
  rule: [
    // need greater than 5
    {
      code: 'GREATER_THAN_5',
      function: value => {
        return value > 5
      },
      message: 'value should be greater than 5'
    },
    // should be a number
    {
      code: 'SHOULD_BE_NUMBER',
      expression: '^[0-9]*$',
      message: 'should be a number'
    }
  ]
}

const messages1 = validate(parameterDefinition, [6, 7, 8])
console.log(messages1) // []

const messages2 = validate(parameterDefinition, [6, 7, '8'])
console.log(messages2) // [ 'should be a number' ]

const messages3 = validate(parameterDefinition, [6, 7, 4])
console.log(messages3) // [ 'value should be greater than 5' ]

const messages4 = validate(parameterDefinition, [6, 7, 4, 5])
console.log(messages4) // [ 'Length must be less than or equal to 3 items', 'value should be greater than 5' ]
```

### Validate File Usage

```js
import { validate } from '@sumor/validator'

const parameterDefinition = {
  type: 'file',
  required: true,
  length: 3,
  rule: [
    // need greater than 5
    {
      code: 'GREATER_THAN_5',
      function: value => {
        return value.size > 5
      },
      message: 'size should be greater than 5'
    }
  ]
}

const messages1 = validate(parameterDefinition, { size: 6 })
console.log(messages1) // []

const messages2 = validate(parameterDefinition, { size: 4 })
console.log(messages2) // [ 'size should be greater than 5' ]
```

### Format String Usage

##### Trim Usage

will remove the useless space for prefix and suffix

```js
import { format } from '@sumor/validator'

const parameterDefinition = {
  type: 'string',
  trim: true // default is true for string type
}

const value = format(parameterDefinition, ' demo ')
console.log(value) // will print "demo", useless space will be removed
```

##### Lowercase Usage

will convert the string to lowercase

```js
import { format } from '@sumor/validator'

const parameterDefinition = {
  type: 'string',
  lowercase: true
}

const value = format(parameterDefinition, 'Demo')
console.log(value) // will print "demo", all characters will be converted to lowercase
```

##### Uppercase Usage

will convert the string to uppercase

```js
import { format } from '@sumor/validator'

const parameterDefinition = {
  type: 'string',
  uppercase: true
}

const value = format(parameterDefinition, 'Demo')
console.log(value) // will print "DEMO", all characters will be converted to uppercase
```

### Format Number Usage

```js
import { format } from '@sumor/validator'

const parameterDefinition = {
  type: 'number',
  decimal: 2
}

const value1 = format(parameterDefinition, 1.234)
console.log(value1) // will print 1.23, only keep 2 decimal

const value2 = format(parameterDefinition, '1.234')
console.log(value2) // will convert to number 1.23, only keep 2 decimal
```

### Enable Output Error

If you pass error:true, response will be an SumorError object.
You can change language and export json support by [@sumor/error](https://www.npmjs.com/package/@sumor/error)

```js
import { validate } from '@sumor/validator'

const parameterDefinition = {
  error: true,
  type: 'string',
  required: true,
  length: 10,
  rule: [
    {
      code: 'LENGTH_GREATER_THAN_5',
      expression: value => {
        return value.length > 5
      },
      message: 'length should be greater than 5'
    }
  ]
}

const messages = validate(parameterDefinition, 'demo123456')
console.log(messages)
/* 
SumorError
{
  code: 'LENGTH_GREATER_THAN_5',
  message: 'length should be greater than 5'
}
*/
```
