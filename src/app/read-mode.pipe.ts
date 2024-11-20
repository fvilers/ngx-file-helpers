import { Pipe, PipeTransform } from '@angular/core';
import { ReadMode } from 'ngx-file-helpers';

@Pipe({
  standalone: true,
  name: 'readMode',
})
export class ReadModePipe implements PipeTransform {
  public transform(value: ReadMode): string {
    switch (value) {
      case ReadMode.ArrayBuffer:
        return 'Array Buffer';
      case ReadMode.BinaryString:
        return 'Binary String';
      case ReadMode.DataURL:
        return 'Data URL';
      case ReadMode.Text:
        return 'Text';
      case ReadMode.Skip:
        return 'Skip';
      default:
        console.warn('Missing case for read mode', value);
        return '';
    }
  }
}
