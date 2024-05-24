import {
  describe, expect, it
} from '@jest/globals'
import versionSorter from '../src/utils/versionSorter.js'

describe('Utils', () => {
  it('sort versions', () => {
    const versions = ['1.0.0', '1.0.1', '1.10.2', '1.0.3', '1.0.4', '1.2.1', '1.1.2']
    expect(versionSorter(versions)).toEqual(['1.0.0', '1.0.1', '1.0.3', '1.0.4', '1.1.2', '1.2.1', '1.10.2'])
  })
})
