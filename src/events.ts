import { listen } from '@tauri-apps/api/event';
import { readTextFile } from '@tauri-apps/api/fs';
import { writeText } from '@tauri-apps/api/clipboard';
import { splitTokens } from './io/vmf';

listen<string[]>('tauri://file-drop', (event) => {
  console.log(event);
  if (!event.payload || event.payload.length < 1) return;

  const filename = event.payload[0];
  const extension = filename.split('.').pop();
  switch(extension) {
    case 'vmf':
      // handle vmf
      readAndParseFile(filename, splitTokens).then((r) => writeText(r));
      break;
    default:
      // unknown file type
      return;
  }
});

async function readAndParseFile<T>(filename: string, parser: (data: string) => T): Promise<T> {
  try {
    const data = await readTextFile(filename);
    return parser(data);
  } catch (err) {
    throw err;
  }
}