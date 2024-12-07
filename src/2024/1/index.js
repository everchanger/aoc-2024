async function taskA (input) {
  const rows = input.trim().split('\n');
  const leftList = []
  const rightList = []
  for (const row of rows) {
    const [left, right] = row.split('   ')
    leftList.push(+left)
    rightList.push(+right)
  }

  leftList.sort();
  rightList.sort();

  let distance = 0;
  for (let i = 0; i < leftList.length; ++i) {
    distance += Math.max(leftList[i], rightList[i]) - Math.min(leftList[i], rightList[i])
  }

  return distance
}

async function taskB (input) {
  const rows = input.trim().split('\n');

  const numList = []
  const lookup = {}
  for (const row of rows) {
    const [left, right] = row.split('   ')
    if (!lookup[right]) {
      lookup[right] = 0;
    }
    lookup[right]++;
    numList.push(left)
  }

  let similarity = 0
  for (const value of numList) {
    if (!lookup[value]) {
      continue
    }
    similarity += +value * lookup[value]
  }
  return similarity
}

export { taskA, taskB }
