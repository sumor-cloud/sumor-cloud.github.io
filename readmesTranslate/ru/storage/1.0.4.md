# storage

A [Sumor Cloud](https://sumor.cloud) Tool.  
[More Documentation](https://sumor.cloud/storage)

This is a lightweight storage library for Node.JS.
It can connect to various storage services, such as Aliyun OSS

[![CI](https://github.com/sumor-cloud/storage/actions/workflows/ci.yml/badge.svg)](https://github.com/sumor-cloud/storage/actions/workflows/ci.yml)
[![Test](https://github.com/sumor-cloud/storage/actions/workflows/ut.yml/badge.svg)](https://github.com/sumor-cloud/storage/actions/workflows/ut.yml)
[![Coverage](https://github.com/sumor-cloud/storage/actions/workflows/coverage.yml/badge.svg)](https://github.com/sumor-cloud/storage/actions/workflows/coverage.yml)
[![Audit](https://github.com/sumor-cloud/storage/actions/workflows/audit.yml/badge.svg)](https://github.com/sumor-cloud/storage/actions/workflows/audit.yml)

## Installation

```bash
npm i @sumor/storage --save
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

### Import

```js
import { Storage } from '@sumor/storage'

const storage = new Storage(config)
```

### Config format

example for aliyun OSS

```json
{
  "type": "aliyunOSS",
  "accessKeyId": "xxxx",
  "accessKeySecret": "xxx",
  "region": "oss-us-west-1",
  "bucket": "sumor-cloud"
}
```

### Put

put content support text, buffer, stream

```js
import { Storage } from '@sumor/storage'

const storage = new Storage(config)

const filename = 'demo.txt'
const content = 'Hello World'

const result = await storage.put(filename, content)
```

### Get

```js
import { Storage } from '@sumor/storage'

const storage = new Storage(config)

const filename = 'demo.txt'

const result = await storage.get(filename)
```

### Delete

```js
import { Storage } from '@sumor/storage'

const storage = new Storage(config)

const filename = 'demo.txt'

const result = await storage.delete(filename)
```
