const mul = (string) => {
  const regex = new RegExp("mul\\((\\d+),(\\d+)\\)", "gm")
  let sum = 0;
  let arr
  while (arr = regex.exec(string)) {
    sum += +arr[1] * +arr[2]
  }
  return sum
}

async function taskA (input) {
  return mul(input)
}

async function taskB (input) {
  const donts = input.split('don\'t()');

  let result = mul(donts[0]);
  for (let i = 1; i < donts.length; ++i) {
    const dos = donts[i].split('do()')
    // only check for multiplications if we can find a do in this string
    if (dos.length < 2) continue

    // join all the terms to the right of the first do!
    const [_, ...valid] = dos
    
    result += mul(valid.join(''))
  }

  return result
}

export { taskA, taskB }
