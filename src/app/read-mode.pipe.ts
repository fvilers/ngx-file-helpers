import { Pipe, PipeTransform } from '@angular/core';

import { ReadMode } from 'ngx-file-helpers';

@Pipe({
  name: 'readMode'
})
export class ReadModePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case ReadMode.arrayBuffer:
        return 'Array Buffer';
      case ReadMode.binaryString:
        return 'Binary String'
      case ReadMode.dataURL:
        return 'Data URL';
      case ReadMode.text:
        return 'Text';
    }
  }
}