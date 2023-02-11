# Human String To Date/Time

A library that parses a human representation of a UK English formatted date/time into an object.

It will always return the object with bits that are unkown are set to `null`.

## Example Inputs

- `1st December`
- `December 1st`
- `December 1`
- `1 Dec`
- `Dec 1993`
- `Dec 1993`
- `01/12`
- `01-12`
- `01.12`
- `01.12.93`
- `01.12.1993`
- `01.12.1993`
- `1pm`
- `1:12pm`
- `13:12`
- `13:12:10`
- `13:12:10.300`
- `quarter to 12`
- `Wednesday 16th`
- `Thursday`
- `Sat`
- `12th November 1995 at quarter past 2`

## Usage

```ts
import { parse } from 'human-string-to-date-time';

console.log(parse('12th November 1995 at quarter past 2'));
```

outputs

```js
{
  dayOfWeek: 0,
  day: 11,
  month: 10,
  year: 1995,
  hour: 2,
  minute: 15,
  second: null,
  millisecond: null,
  wasTwelveHourFormat: true
}
```

## Bugs

If you have a string that you believe should be parseable but is not working please [open an issue](https://github.com/tjenkinson/human-string-to-date-time/issues/new).
