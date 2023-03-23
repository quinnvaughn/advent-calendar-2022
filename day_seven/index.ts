import fs from 'fs'

const data = fs.readFileSync('data.txt', 'utf-8');




function parseData(data: string, length: number = 4) {
    for (let i = length; i < data.length; i += 1) {
        const substring = data.substring(i - length, i);

        // This would be a lot bigger pain in the ass 
        // if Set did not exist. 
        const isSet = new Set(substring).size === length;

        if (isSet) {
            console.log(substring, i);
            break 
        }
    }
}

parseData(data)

parseData(data, 14)
