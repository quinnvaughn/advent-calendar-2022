import fs from 'fs'


const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const alphabetMap = alphabet
    .split('')
    .reduce((map, letter, index) => {
        map[letter] = index + 1;
        map[letter.toUpperCase()] = index + 27;
        return map;
    }, {} as { [key: string]: number });

const data = fs.readFileSync('data.txt', 'utf-8');


let groupedTotal = 0
// For each group of 3 rucksacks, find the common letter between them
// and sum the value
data
    .split('\n')
    .map(rucksack => rucksack.split(''))
    .reduce((groups, rucksack, index) => {
        const groupIndex = Math.floor(index / 3);
        groups[groupIndex] = groups[groupIndex] || [];
        groups[groupIndex].push(rucksack);
        return groups;
    }, [] as string[][][])
    .map(group => {
        // Find the common letters between the three substrings
        const commonLetter = group[0]
            .filter(letter => group[1].includes(letter) && group[2].includes(letter))
            .shift() as string;

        // Find the value in the alphabet map
        const value = alphabetMap[commonLetter];
        groupedTotal += value;
    })

console.log(groupedTotal);