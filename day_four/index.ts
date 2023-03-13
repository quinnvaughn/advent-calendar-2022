import fs from 'fs'

const data = fs.readFileSync('data.txt', 'utf-8');

type NumberTuple = [number, number]

function fullIntersection(sections: number[][]) {
    const first = sections[0] as NumberTuple
    const second = sections[1] as NumberTuple

    function isFullIntersection(first: NumberTuple, second: NumberTuple) {
        return first[0] >= second[0] && first[1] <= second[1]
    }

    return isFullIntersection(first, second) || isFullIntersection(second, first)
}

function partialIntersection(sections: number[][]) {
    const first = sections[0] as NumberTuple
    const second = sections[1] as NumberTuple

    function isPartialIntersection(first: NumberTuple, second: NumberTuple) {
        return first[0] <= second[0] && first[1] >= second[0]
    }

    return isPartialIntersection(first, second) || isPartialIntersection(second, first)
}

function getSections() {
    return data.split('\n').map((line) => line.split(',')).map((section) => section.map((value) => value.split('-').map(Number)))
}

function countFunction(counter: (section: number[][]) => boolean) {
    const sections = getSections()

    let count = 0

    sections.forEach((section) => {
        if (counter(section)) {
            count++
        }
    })

    console.log(count)
}

function firstPart() {
    countFunction(fullIntersection)
}

function secondPart() {
    countFunction(partialIntersection)
}

firstPart()

secondPart()

