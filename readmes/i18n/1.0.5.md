# i18n

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/i18n)

This is a lightweight i18n library for Node.js and the browser.
You can easily use it to manage your i18n resources.
And apply it to your project.

[![CI](https://github.com/sumor-cloud/i18n/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/i18n/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/i18n/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/i18n/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/i18n/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/i18n/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/i18n/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/i18n/actions/workflows/audit.yml)

## Installation

```bash
npm i @sumor/i18n --save
```

## Prerequisites

### Node.JS version

Require Node.JS version 18.x or above

### require Node.JS ES module

As this package is written in ES module,
please change the following code in your `package.json` file:

```json
{
  "type": "module"
}
```

## Usage

```javascript
import getI18n from '@sumor/i18n'

const i18nConfig = {
  en: {
    demo: {
      hello: 'Hello',
      welcome: 'Welcome',
      greeting: 'Hello, {name}',
      test: 'Test'
    }
  },
  zh: {
    demo: {
      hello: '你好',
      welcome: '欢迎'
    }
  },
  'zh-TW': {
    demo: {
      hello: '妳好',
      greeting: '妳好, {name}'
    }
  }
}

const i18n = getI18n('zh-TW', i18nConfig)

// match zh-TW
console.log(i18n('demo.hello')) // 妳好
console.log(i18n('demo.greeting', { name: 'John' })) // 妳好, John

// match zh
console.log(i18n('demo.welcome')) // 欢迎

// match en
console.log(i18n('demo.test')) // Test
```
