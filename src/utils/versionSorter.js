export default (arr) => {
  // sort versions ["1.0.0", "1.10.1", "1.1.1"] => ["1.0.0", "1.1.1", "1.10.1"]
  return arr.sort((a, b) => {
    const aArr = a.split('.').map(i => parseInt(i, 10))
    const bArr = b.split('.').map(i => parseInt(i, 10))
    for (let i = 0; i < aArr.length; i++) {
      if (aArr[i] > bArr[i]) {
        return 1
      } else if (aArr[i] < bArr[i]) {
        return -1
      }
    }
    return 0
  })
}
