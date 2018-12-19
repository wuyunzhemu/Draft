async function t1 () {
  console.log(1)
  console.log(2)
  await Promise.resolve().then(() => console.log('t1p'))
  await console.log(3)
  console.log(4)
}

async function t2() {
  console.log(5)
  console.log(6)
  await Promise.resolve().then(() => console.log('t2p'))
  console.log(7)
  console.log(8)
}

t1()
t2()

console.log('end')