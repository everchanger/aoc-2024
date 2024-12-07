const reactor = (levels) => {
  let lastLevel = -1
  let min = 1
  let max = 3
  let isIncrease = undefined
  for (const level of levels) {
    if (lastLevel < 0) {
      lastLevel = level
      continue
    }
    let isCurrentIncrease = false
    if (lastLevel < level) {
      isCurrentIncrease = true
    }

    if (isIncrease === undefined) {
      isIncrease = isCurrentIncrease
    }

    if (isCurrentIncrease !== isIncrease) {
      // console.log('uh oh, wrong direction')
      return false;
    }

    if (isIncrease) {
      if (level >= lastLevel + min && level <= lastLevel + max) {
        // console.log('safe increase!', lastLevel, level)
      } else {
        // console.log('unsafe increase!', lastLevel, level)
        return false;
      }
    } else {
      if (level <= lastLevel - min && level >= lastLevel - max) {
        // console.log('safe decrease!', lastLevel, level)
      } else {
        // console.log('unsafe decrease!', lastLevel, level)
        return false;
      }
    }

    lastLevel = level
  }

  return true
}

async function taskA (input) {
  const rows = input.trim().split('\n')
  let safe = 0
  for (const row of rows) {
    const levels = row.split(' ').map(level => +level)
    const isOk = reactor(levels)
    if (isOk ) safe++
  }
  return safe
}

async function taskB (input) {
  const rows = input.trim().split('\n')
  let safe = 0
  for (const row of rows) {
    const levels = row.split(' ').map(level => +level)

    if (reactor(levels)) {
      safe++;
      continue;
    }

    const retryReactor = (levelList, indexToRemove) => {
      const localList = [...levelList]
      localList.splice(indexToRemove, 1)
      return reactor(localList)
    }

    let isSafe = false
    for (let i = 0; i < levels.length && isSafe === false; ++i) {
      if (retryReactor(levels, i)) {
        isSafe = true
      }
    }

    if (isSafe) {
      safe++
    }
  }
  return safe
}

export { taskA, taskB }
