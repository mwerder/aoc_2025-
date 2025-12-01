const dayArg = process.argv[2];

if (!dayArg) {
  console.error('Usage: pnpm day 01');
  process.exit(1);
}

const day = dayArg.padStart(2, '0');

// This will execute the corresponding day file, e.g. src/day01.ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`./day${day}.ts`);
