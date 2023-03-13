import fs from 'fs'

const file = fs.readFileSync('data.txt', 'utf8')


const groupedElves = file.split('\n\n').map((group) => {
    return group.split('\n')
})

const elves = groupedElves.map((group) => {
    return group.map(group => Number(group)).reduce((total, calories) => total + calories)
})

const total = elves.sort((a, b) => b - a).slice(0, 3).reduce((total, calories) => total + calories)

console.log(total)