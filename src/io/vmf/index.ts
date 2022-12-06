import { fromRawSolid } from "./geometry";

const DATA_REGEX = /"(.+?)"/g
type VMFToken = Record<string, string | VMFToken[]>

function addToToken(token: VMFToken, key: string, value: string | VMFToken) {
  if (typeof value === 'string') {
    // Assign property
    token[key] = value;
  } else {
    // Create or append to list of children
    if (key in token) {
      (token[key] as VMFToken[]).push(value);
    } else {
      token[key] = [value];
    }
  }

  return token;
}

export function splitTokens(text: string) {
  let previousLine = '';
  let result = {} as VMFToken;

  let depth = 0;
  let stack = [];
  let temp = { category: '', data: {} as VMFToken };


  const lines = text.split('\n');
  for (let i=0; i<lines.length; i++) {
    let line = lines[i];

    if (line.includes('}')) {
      // Close the current object
      depth -= 1;

      if (depth === 0) {
        // We've completed a full, top-level object!
        result = addToToken(result, temp.category, temp.data);
        continue;
      }

      if (stack.length > 0) {
        const last = stack.pop()!;
        last.data = addToToken(last.data, temp.category, temp.data);
        temp = last;
        continue;
      } else {
        throw Error(`Unexpected } on line ${i}`)
      }
    }

    if (line.includes('{')) {
      // Open a new object
      if (depth > 0) {
        stack.push(temp);
      }
      temp = { category: previousLine, data: {} as VMFToken };
      depth += 1;
      continue;
    }

    if (line.includes('"')) {
      // Data!
      const lineData = [...line.matchAll(DATA_REGEX)];
      if (lineData.length === 2 && temp) {
        temp.data = addToToken(temp.data, lineData[0][1], lineData[1][1]);
      }
      continue;
    }

    previousLine = line.trim();
  }

  // Depth should be 0 and life should be good
  console.log(result);
  const solids = (result['world'] as VMFToken[])[0]['solid'] as VMFToken[];
  return { raw: result, solids: solids.map(fromRawSolid) };
}