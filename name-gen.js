const adjectives = require('animal-id/adjectives.json')
const nouns = require('animal-id/animals.json')

module.exports = nameGenerator

function nameGenerator(randomInt){
  const adj = adjectives[randomInt % adjectives.length]
  const noun = nouns[randomInt % nouns.length]
  return `${adj} ${noun}`
}