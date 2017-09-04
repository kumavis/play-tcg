const MersenneTwister = require('mersenne-twister')
const nameGenerator = require('./name-gen')

const playerA = {
  hand: createDeck({ length: 5 })
}

const playerB = {
  hand: createDeck({ length: 5 })
}

console.log(JSON.stringify(playerA, null, 2))
console.log(JSON.stringify(playerB, null, 2))


function createDeck({ length }){
  const deck = Array(length).fill().map((_, index) => {
    if (index/length < 0.7) {
      const id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
      return createCreateCard(id)
    } else {
      return {
        id: 0,
        tags: ['land'],
        value: 1,
      }
    }
  })
  return deck
}

function createCreateCard(id){
  const pRandom = new MersenneTwister(id)
  const rarityLevelCount = 10
  // http://www.wolframalpha.com/input/?i=floor((x%5E2)*10)+from+0+to+1
  const rarityLevel = Math.floor(Math.pow(pRandom.random(), 2) * rarityLevelCount)
  const rarity = rarityLevel / rarityLevelCount
  const pointEfficiency = 1 + 0.5 * rarity
  const maxPoints = 10
  // http://www.wolframalpha.com/input/?i=floor((x%5E2)*10)+from+0+to+1
  const points = 1 + Math.floor(Math.pow(pRandom.random(), 2) * maxPoints)
  // http://www.wolframalpha.com/input/?i=Plot3D%5Bfloor(2*Sqrt%5Bx%5D%2Fy),+%7Bx,+0,+10%7D,+%7By,+1,+1.5%7D%5D
  // const cost = Math.floor(2 * Math.sqrt(points) / pointEfficiency)
  const cost = Math.floor(points / pointEfficiency)
  // spend points
  let attack = 0
  let defense = 1
  Array(points).fill().map(() => {
    if (pRandom.random_incl() > 0.5) {
      attack++
    } else {
      defense++
    }
  })
  const name = nameGenerator(pRandom.random_int())
  const tags = ['creature']
  return { name, tags, cost, attack, defense, rarityLevel, points, id }
}

// [0, 0.5]: 1
// [0.5, 0.75]: 2
// [0.75, ...]: 3

// (1-2^0),(1-2^-1) = 1
// (1-2^-1),(1-2^-2) = 2

// (1-(2^(-(10))))

// f(n) = g = 1-(2^-(n+y))
// g(n) = (-y*log(2) - log(1 - n))/log(2)

// (y (-log(2)) - log(1 - n))\/(log(2))

// -log(1-n)/log(2)

// -log(1-n)/log(2)

// 1-(2^-(n+y)) n:[0-1)

// -(log((log(1 - n))\/(log(2)) + y + 1))\/(log(2))


// Plot3D[Re[-(y Log[2]) - Log[1 - n]], {n, 0, 1}, {y, 0, 10}]
// http://www.wolframalpha.com/input/?i=Plot3D%5BRe%5B-(y+Log%5B2%5D)+-+Log%5B1+-+n%5D%5D,+%7Bn,+0,+1%7D,+%7By,+0,+10%7D%5D