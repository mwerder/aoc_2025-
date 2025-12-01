const { readFileSync } = require('fs');
const { join } = require('path');

const inputPath = join(__dirname, '..', 'input', 'day01.txt');

function readDay01Input(): string[] {
  const raw = readFileSync(inputPath, 'utf8');

  return raw
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0);
}

const lines = readDay01Input();

// prepare input
const parseInput = (lines: string[]): number[] => {
  return lines.map((line: string) => {
    const direction = line.charAt(0);
    const distance = line.substring(1);
    if (direction === 'R') {
      return parseInt(distance);
    }
    if (direction === 'L') {
      return -parseInt(distance);
    }
    throw new Error(`Invalid direction: ${direction}`);
  });
};

const fixOverflow = (position: number): number => {
  const newPos = position % 100;
  // ensure positive
  const wrapped = (newPos + 100) % 100;
  return wrapped;
};

const parsed = parseInput(lines);

// part 1
let position = 50;
let zeroCounter = 0;

parsed.forEach((distance: number) => {
  position += distance;
  if (position < 0 || position > 99) {
    position = fixOverflow(position);
  }
  if (position === 0) {
    zeroCounter++;
  }
});

console.log('part 1:', zeroCounter);

// part 2
// also count how many times we pass through 0
zeroCounter = 0;
position = 50;

parsed.forEach((distance: number) => {
  for (let i = 0; i < Math.abs(distance); i++) {
    position += distance > 0 ? 1 : -1;
    if (position < 0 || position > 99) {
      position = fixOverflow(position);
    }
    if (position === 0) {
      zeroCounter++;
    }
  }
});

console.log('part 2:', zeroCounter);
