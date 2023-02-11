// TODO make smart so that hour required if minute there?
export type ParsedDate = {
  day: number | null;
  month: number | null;
  year: number | null;
  dayOfWeek: number | null;
  hour: number | null;
  minute: number | null;
  second: number | null;
  timeOfDay: `am` | `pm` | null;
};

const months: Map<string, number> = new Map([
  ['january', 1],
  ['jan', 1],
  ['february', 2],
  ['feb', 2],
  ['march', 3],
  ['mar', 3],
  ['april', 4],
  ['apr', 4],
  ['apr', 4],
  ['may', 5],
  ['june', 6],
  ['jun', 6],
  ['july', 7],
  ['jul', 7],
  ['august', 8],
  ['aug', 8],
  ['september', 9],
  ['sept', 9],
  ['sep', 9],
  ['october', 10],
  ['oct', 10],
  ['november', 11],
  ['nov', 11],
  ['december', 12],
  ['dec', 12],
]);

const monthDays: Map<string, number> = new Map([
  ['1st', 1],
  ['2nd', 2],
  ['3rd', 3],
  ['4th', 4],
  ['5th', 5],
  ['6th', 6],
  ['7th', 7],
  ['8th', 8],
  ['9th', 9],
  ['10th', 10],
  ['11th', 11],
  ['12th', 12],
  ['13th', 13],
  ['14th', 14],
  ['15th', 15],
  ['16th', 16],
  ['17th', 17],
  ['18th', 18],
  ['19th', 19],
  ['20th', 20],
  ['21st', 21],
  ['22nd', 22],
  ['23rd', 23],
  ['24th', 24],
  ['25th', 25],
  ['26th', 26],
  ['27th', 27],
  ['28th', 28],
  ['29th', 29],
  ['30th', 30],
  ['31st', 31],
]);

const wordRegex = /\w+/g;
const tokenRegex = /[^ ]+/g;
const numberRegex = /^\d+/;
const dateRegex = /^([0-9]{1,2})([-/])([0-9]{1,2})(?:\2([0-9]{2,4}))?$/;

export function parse(input: string): ParsedDate {
  const parsed: ParsedDate = {
    day: null,
    month: null,
    year: null,
    dayOfWeek: null,
    hour: null,
    minute: null,
    second: null,
    timeOfDay: null,
  };

  const inLower = input.toLowerCase();
  const words = [...inLower.matchAll(wordRegex)].map(([match]) => match);
  const tokens = [...inLower.matchAll(tokenRegex)].map(([match]) => match);

  // TODO scan and don't use hardcoded num
  if (tokens[0]) {
    const matches = dateRegex.exec(tokens[0]);
    if (matches) {
      parsed.day = parseInt(matches[1], 10);
      parsed.month = parseInt(matches[3], 10);
      if (matches[4]) {
        parsed.year = parseInt(matches[4].padStart(4, `20`), 10);
      }
    }
  }

  if (
    words[0] &&
    numberRegex.test(words[0]) &&
    words[1] &&
    months.has(words[1])
  ) {
    parsed.day = parseInt(words[0], 10);
    if (words[2] && numberRegex.test(words[2])) {
      parsed.year = parseInt(words[2].padStart(4, `20`), 10);
    }
  }

  // TODO similar to above
  if (
    words[0] &&
    months.has(words[0]) &&
    words[1] &&
    numberRegex.test(words[1])
  ) {
    parsed.day = parseInt(words[1], 10);
    if (words[2] && numberRegex.test(words[2])) {
      parsed.year = parseInt(words[2].padStart(4, `20`), 10);
    }
  }

  for (const word of words) {
    const month = months.get(word);
    if (month) parsed.month = month;

    const monthDay = monthDays.get(word);
    if (monthDay) parsed.day = monthDay;
  }

  return parsed;
}
