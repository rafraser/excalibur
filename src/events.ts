import { listen } from '@tauri-apps/api/event';
import { readTextFile } from '@tauri-apps/api/fs';
import { writeText } from '@tauri-apps/api/clipboard';
import { splitTokens } from './io/vmf';
import { addSolid } from './scene';

listen<string[]>('tauri://file-drop', async (event) => {
  if (!event.payload || event.payload.length < 1) return;

  const filename = event.payload[0];
  const extension = filename.split('.').pop();
  switch(extension) {
    case 'vmf':
      // handle vmf
      const vmfData = await readAndParseFile(filename, splitTokens);
      vmfData.solids.forEach(addSolid);
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