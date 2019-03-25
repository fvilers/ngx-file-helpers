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
import { coerceBooleanProperty, readFileAsync } from './helpers';
import { FileHandler } from './file-handler';

@Directive({
  selector: '[ngxFilePicker]',
  exportAs: 'ngxFilePicker'
})
export class FilePickerDirective extends FileHandler implements OnInit {
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

  @Output()
  public filePick = new EventEmitter<ReadFile>();

  private _input: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    super();
  }

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

    this.readFiles(target.files, readFile => this.filePick.emit(readFile));
  }
}
