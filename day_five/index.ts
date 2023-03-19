import fs from 'fs'

const data = fs.readFileSync('data.txt', 'utf-8');

declare global {
    interface Array<T> {
        transpose(): Array<Array<T>>;
    }
}

Array.prototype.transpose = function () {
    // @ts-ignore
    return this[0].map((_, i) => this.map((r) => r[i]));
};

class Board {
    stacks: Stack[]

    constructor() {
        this.stacks = []
    }

    public addStacks(stacks: Stack[]) {
        this.stacks.push(...stacks)
    }

    public getStackAtColumn(column: number) {
        return this.stacks.find((stack) => stack.column === column) as Stack
    }
}

class Stack {
    column: number 
    crates: Crate[]
    constructor(column: number, crates: Crate[]) {
        this.column = column
        this.crates = crates
    }


    public removeCrates(num: number, reverse?: boolean) {
        const poppedCrates = []
        for (let i = 0; i < num; i++) {
            poppedCrates.push(this.crates.pop())
        }
        return reverse ? poppedCrates.reverse() as Crate[] : poppedCrates as Crate[]
    }

    public addCrates(crates: Crate[]) {
        this.crates.push(...crates)
    }
    
    public getTopCrate() {
        return this.crates[this.crates.length - 1]
    }
}

class Crate {
    letter: string
    constructor(letter: string) {
        this.letter = letter
    }
}


function parseData(data: string, reverse?: boolean) {
    // get each line. trim white space and split by space.
    // then get the second letter of each word, which is the actual letter.
    // Easier than removing brackets.

    const [input_stacks, input_moves] = data.trimEnd().split('\n\n').map((part) => part.split('\n'))

    const stacks = input_stacks.map((row) => [...row]).transpose().map((row) => row.join('').replace(/\[|\]/g, '').trim()).filter((row) => row.length > 0).map((row) => [...row.slice(0, -1)].reverse()).map((stack, index) => new Stack(index + 1, stack.map(letter => new Crate(letter))))

    const board = new Board()
    board.addStacks(stacks)

    // @ts-ignore
    const moves = input_moves.map((line) => Array.from(line.matchAll(/\d+/g), (match: string) => parseInt(match, 10)))
    moves.forEach((move) => {
        const [num, from, to] = move

        const fromStack = board.getStackAtColumn(from)
        const toStack = board.getStackAtColumn(to)

        const crates = fromStack.removeCrates(num, reverse)
        toStack.addCrates(crates)
    })



    const topCrates = stacks.map((stack) => stack.getTopCrate())
    const letters = topCrates.map((crate) => crate.letter)
    console.log(letters.join(''))
}

parseData(data)

parseData(data, true)