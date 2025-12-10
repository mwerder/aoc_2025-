const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, '..', 'input', 'day02.txt');

function readInput(): string[] {
  const raw = readFileSync(inputPath, 'utf8');

  return raw
    .split(',')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0);
}

const input = readInput();
console.log(`🚀 ~ input:`, input);

// part1

const getValues = (input: string): [number, number] => {
  const [min, max] = input.split('-');
  if (!min || !max) {
    throw 'ups';
  }
  return [parseInt(min, 10), parseInt(max, 10)];
};

const hasPattern = (number: number): boolean => {
  const numStr = number.toString();
  if (numStr.length % 2 !== 0) {
    // odd number cant have repeating digits
    return false;
  }

  const firstHalf = numStr.slice(0, numStr.length / 2);
  const secondHalf = numStr.slice(numStr.length / 2);
  if (firstHalf === secondHalf) {
    return true;
  }
  return false;
};

let result1 = 0;

input.forEach((line) => {
  const [min, max] = getValues(line);
  for (let i = min; i <= max; i++) {
    if (hasPattern(i)) {
      result1 += i;
    }
  }
});

console.log('part 1:', result1);
// part 2

const hasAdvancedPattern = (subNumber: string, number: string): boolean => {
  if (number.length <= 1 || number.length % subNumber.length !== 0) {
    // must fit into number evenly
    return false;
  }
  const parts = [];
  for (let i = 0; i < number.length / subNumber.length; i++) {
    parts.push(number.slice(i * subNumber.length, (i + 1) * subNumber.length));
  }

  return parts.every((part) => part === subNumber);
};

let result2 = 0;

input.forEach((line) => {
  const [min, max] = getValues(line);
  for (let i = min; i <= max; i++) {
    const numStr = i.toString();
    for (let j = 0; j < numStr.length / 2; j++) {
      const subNumber = numStr.slice(0, j + 1);
      if (hasAdvancedPattern(subNumber, numStr)) {
        console.log(`🚀 ~ hasAdvancedPattern ~ i:`, i);
        result2 += i;
        break;
      }
    }
  }
});

console.log('part 2:', result2);
