# ngx-file-helpers

Angular File Helpers

## Installation

Add the package to your application.

```
npm install --save ngx-file-helpers
```

## Demo

https://stackblitz.com/edit/ngx-file-helpers-demo

## Support

If you use and like this library, feel free to support my Open Source projects.

[![donate](https://www.paypalobjects.com/en_US/BE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=JZ26X897M9V9L&currency_code=EUR)

## Breaking changes

Here's a list of the breaking changes upon the 2.0 release:

- Angular (core/common) version 7.2.0 or greater is a peer dependency;
- The module name has changed to `NgxFileHelpersModule`;
- Read mode is not anymore binded using the directive name but the `[readMode]` property;
- The `lastModifiedDate` property doesn't exist anymore on the `ReadFile` interface.

## Getting started

Import the file helpers module to your application module.

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFileHelpersModule } from 'ngx-file-helpers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxFileHelpersModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## File Picker

Add the file picker directive to an element, like a button.

```
<button type="button" ngxFilePicker>Browse</button>
```

Select how the file should be read; by default the mode is dataUrl.

```
<button type="button" ngxFilePicker [readMode]="readMode">Browse</button>
```

Bind to the `filePick` event to get the picked file from the `$event` variable.

```
<button
  type="button"
  ngxFilePicker
  (filePick)="file = $event">
  Browse
</button>
```

Use the optional `accept` attribute to indicate the types of files that the control can select.

```
<button
  type="button"
  ngxFilePicker
  accept="image/*"
  (filePick)="file = $event">
  Browse
</button>
```

Use the optional `multiple` attribute to indicate whether the user can pick more than one file.

```
<button
  type="button"
  ngxFilePicker
  accept="image/*"
  multiple
  (filePick)="file = $event">
  Browse
</button>
```

Use the option `filter` attribute to specify a callback that you would implemented to filter if the file should be read or ignored.

```
<button
  type="button"
  ngxFilePicker
  accept="image/*"
  multiple
  [filter]="ignoreTooBigFile"
  (filePick)="file = $event">
  Browse
</button>
```

```
export class MyComponent {
  ...
  ignoreTooBigFile(file: File): boolean {
    return file.size < 100000;
  }
}
```

The directive also has a `reset()` method that unset the selected file. This is useful if you want to force the `filePick` event to trigger again even if the user has picked the same file. The directive is exported as `ngxFilePicker` so you can select is using a `ViewChild` decorator.

```
<button
  ngxFilePicker
  #myFilePicker="ngxFilePicker">
  Browse
</button>
```

```
export class MyComponent {
  ...
  @ViewChild('myFilePicker')
  private filePicker: FilePickerDirective;
  ...

  onReadEnd(fileCount: number) {
    this.status = `Read ${fileCount} file(s) on ${new Date().toLocaleTimeString()}.`;
    this.filePicker.reset();
  }
}
```

There are two more events that can be listened to:

- `readStart`: triggered when the directive start to read files;
- `readEnd`: triggered when the directive has read all the files.

These two events emit the number of file (`$event` variable) to be or that has been read.

In some cases you may want to filter files before reading them. You could use a special input argument `filter` which takes a function which should return `true` file to be read or `false` to stop reading.

```
export class MyComponent {
  ...

  filterFileBeforeReading(file) {
    // file is a native browser File
    // skip files which are >25mb
    return file.size < 25 * 1000 * 1000;
  }
}
```

```
<button
  type="button"
  ngxFilePicker
  accept="*"
  multiple
  [filter]="filterFileBeforeReading"
  (filePick)="file = $event">
  Browse
</button>
```

## File Dropzone

Add the file dropzone directive to an element, like a div.

```
<div ngxFileDropzone>Drop a file in this zone.</div>
```

Select how the file should be read; by default the mode is dataUrl.

```
<div ngxFileDropzone [readMode]="readMode">Drop a file in this zone.</div>
```

Bind to the `fileDrop` event to get the dropped file from the `$event` variable.

```
<div
  ngxFileDropzone
  (fileDrop)="file = $event">
  Drop a file in this zone.
</div>
```

The directive is exported as `ngxFileDropzone` so you can select is using a `ViewChild` decorator. You can use the same `filter` attribute and `readStart`, `readEnd` events (see the `FilePicker` directive).

## ReadFile

The read file implements the following interface:

```
interface ReadFile {
  name: string;
  size: number;
  type: string;
  readMode: ReadMode;
  content: any;
}
```

## ReadMode

Available read modes are exposed through the ReadMode enum:

```
enum ReadMode {
  arrayBuffer,
  binaryString,
  dataURL,
  text
}
```
