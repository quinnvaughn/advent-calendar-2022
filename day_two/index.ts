import fs from 'fs'
import {match, P} from 'ts-pattern'

const file = fs.readFileSync('data.txt', 'utf8')



class Outcome {
    outcome: 'WIN' | 'LOSE' | 'DRAW'

    constructor(outcome: 'WIN' | 'LOSE' | 'DRAW') {
        this.outcome = outcome
    }

    public getScore() {
        return match(this.outcome)
            .with('WIN', () => 6)
            .with('LOSE', () => 0)
            .with('DRAW', () => 3)
        .exhaustive()
    }
}

class Choice {
    choice: 'ROCK' | 'PAPER' | 'SCISSORS'

    constructor(choice: 'ROCK' | 'PAPER' | 'SCISSORS') {
        this.choice = choice
    }

    public getScore() {
        return this.choice === 'ROCK' ? 1 : this.choice === 'PAPER' ? 2 : 3
    }
}

class Round {
    opponent: Choice
    outcome: Outcome
    constructor(opponent: Choice, outcome: Outcome) {
        this.opponent = opponent
        this.outcome = outcome
    }

    public getOptimalChoice(): Choice {
        return match([this.opponent, this.outcome])
            .with([new Choice('ROCK'), new Outcome('WIN')], () => new Choice('PAPER'))
            .with([new Choice('ROCK'), new Outcome('LOSE')], () => new Choice('SCISSORS'))
            .with([new Choice('ROCK'), new Outcome('DRAW')], () => new Choice('ROCK'))
            .with([new Choice('PAPER'), new Outcome('WIN')], () => new Choice('SCISSORS'))
            .with([new Choice('PAPER'), new Outcome('LOSE')], () => new Choice('ROCK'))
            .with([new Choice('PAPER'), new Outcome('DRAW')], () => new Choice('PAPER'))
            .with([new Choice('SCISSORS'), new Outcome('WIN')], () => new Choice('ROCK'))
            .with([new Choice('SCISSORS'), new Outcome('LOSE')], () => new Choice('PAPER'))
            .with([new Choice('SCISSORS'), new Outcome('DRAW')], () => new Choice('SCISSORS'))
            .with(P._, () => new Choice('ROCK'))
        .exhaustive()
    }

    public getScore() {
        return this.getOptimalChoice().getScore() + this.outcome.getScore()
    }
}

function mapOpponentChoice(choice: 'A' | 'B' | 'C') {
    return choice === 'A' ? new Choice('ROCK') : choice === 'B' ? new Choice('PAPER'): new Choice('SCISSORS')
}

function mapOptimalOutcome(outcome: 'X' | 'Y' | 'Z') {
    return outcome === 'X' ? new Outcome('LOSE') : outcome === 'Y' ? new Outcome('DRAW'): new Outcome('WIN')
}

async function main() {
    const mappedRounds = file.split('\n').map((round) => {
        const [opponentChoice, outcome] = round.split(' ') as ['A' | 'B' | 'C', 'X' | 'Y' | 'Z']
        return new Round(mapOpponentChoice(opponentChoice), mapOptimalOutcome(outcome))
    })

    console.log(mappedRounds.reduce((acc, round) => acc + round.getScore(), 0))
 }


main()