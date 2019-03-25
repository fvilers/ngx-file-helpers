import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  HostListener,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';

import { ReadFile } from './read-file';
import { ReadFileImpl } from './read-file-impl';
import { ReadMode } from './read-mode.enum';
import { coerceBooleanProperty } from './helpers';

@Directive({
  selector: '[ngxFilePicker]',
  exportAs: 'ngxFilePicker'
})
export class FilePickerDirective implements OnInit {
  @Input()
  public accept = '';

  @Input()
  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple: boolean;

  @Input('ngxFilePicker')
  public readMode: ReadMode;

  @Input()
  public filter: (file: any) => boolean = () => true;

  @Output()
  public filePick = new EventEmitter<ReadFile>();

  @Output()
  public readStart = new EventEmitter<number>();

  @Output()
  public readEnd = new EventEmitter<number>();

  private input: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnInit() {
    this.input = this.renderer.createElement('input');
    this.renderer.appendChild(this.el.nativeElement, this.input);

    this.renderer.setAttribute(this.input, 'type', 'file');
    this.renderer.setAttribute(this.input, 'accept', this.accept);
    this.renderer.setStyle(this.input, 'display', 'none');

    if (this.multiple) {
      this.renderer.setAttribute(this.input, 'multiple', 'multiple');
    }

    this.renderer.listen(this.input, 'change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = Array.from<File>(target.files).filter(this.filter);
      const fileCount = files.length;

      this.readStart.emit(fileCount);
      Promise.all(files.map(file => this.readFile(file))).then(() =>
        this.readEnd.emit(fileCount)
      );
    });
  }

  public reset() {
    if (!this.input) {
      console.error(
        'It seems that ngOnInit() has not been executed or that the hidden input element is null. Did you mess with the DOM?'
      );
      return;
    }

    this.input.value = null;
  }

  @HostListener('click')
  public browse() {
    if (!this.input) {
      console.error(
        'It seems that ngOnInit() has not been executed or that the hidden input element is null. Did you mess with the DOM?'
      );
      return;
    }

    this.input.click();
  }

  private readFile(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (loaded: ProgressEvent) => {
        const fileReader = loaded.target as FileReader;
        const readFile = new ReadFileImpl(
          file,
          this.readMode,
          fileReader.result
        );

        this.filePick.emit(readFile);
        resolve();
      };

      switch (this.readMode) {
        case ReadMode.arrayBuffer:
          reader.readAsArrayBuffer(file);
          break;
        case ReadMode.binaryString:
          reader.readAsBinaryString(file);
          break;
        case ReadMode.text:
          reader.readAsText(file);
          break;
        case ReadMode.dataURL:
        default:
          reader.readAsDataURL(file);
          break;
      }
    });
  }
}
