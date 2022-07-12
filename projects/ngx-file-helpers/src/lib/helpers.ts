import { ReadFile } from './read-file';
import { ReadFileImpl } from './read-file-impl';
import { ReadMode } from './read-mode.enum';

export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

export async function readFileAsync(
  file: File,
  readMode: ReadMode
): Promise<ReadFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent) => {
      const fileReader = event.target as FileReader;
      const readFile = new ReadFileImpl(file, readMode, fileReader.result);

      resolve(readFile);
    };

    reader.onerror = (event: ProgressEvent) => {
      reject(event);
    };

    switch (readMode) {
      case ReadMode.arrayBuffer:
        reader.readAsArrayBuffer(file);
        break;
      case ReadMode.binaryString:
        reader.readAsBinaryString(file);
        break;
      case ReadMode.text:
        reader.readAsText(file);
        break;
      case ReadMode.skip:
        // Immediately return without reading the file
        // See: https://github.com/fvilers/ngx-file-helpers/issues/57
        resolve(new ReadFileImpl(file, readMode));
        break;
      case ReadMode.dataURL:
      default:
        reader.readAsDataURL(file);
        break;
    }
  });
}
