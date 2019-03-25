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
import { ReadMode } from './read-mode.enum';
import { coerceBooleanProperty, readFileAsync } from './helpers';

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
  public filter: (
    file: File,
    index: number,
    files: Array<File>
  ) => boolean = () => true;

  @Output()
  public filePick = new EventEmitter<ReadFile>();

  @Output()
  public readStart = new EventEmitter<number>();

  @Output()
  public readEnd = new EventEmitter<number>();

  private _input: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  public ngOnInit() {
    this._input = this.renderer.createElement('input');
    this.renderer.appendChild(this.el.nativeElement, this._input);

    this.renderer.setAttribute(this._input, 'type', 'file');
    this.renderer.setAttribute(this._input, 'accept', this.accept);
    this.renderer.setStyle(this._input, 'display', 'none');

    if (this.multiple) {
      this.renderer.setAttribute(this._input, 'multiple', 'multiple');
    }

    this.renderer.listen(this._input, 'change', (event: Event) =>
      this._onListen(event)
    );
  }

  public reset() {
    if (!this._input) {
      console.error(
        'It seems that ngOnInit() has not been executed or that the hidden _input element is null. Did you mess with the DOM?'
      );
      return;
    }

    this._input.value = null;
  }

  @HostListener('click')
  public browse() {
    if (!this._input) {
      console.error(
        'It seems that ngOnInit() has not been executed or that the hidden _input element is null. Did you mess with the DOM?'
      );
      return;
    }

    this._input.click();
  }

  // The callback signature prevent the async/await usage
  private _onListen(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = Array.from<File>(target.files).filter(this.filter);
    const fileCount = files.length;

    this.readStart.emit(fileCount);
    Promise.all(
      files.map(async file => {
        const readFile = await readFileAsync(file, this.readMode);
        this.filePick.emit(readFile);
      })
    ).then(() => this.readEnd.emit(fileCount));
  }
}
