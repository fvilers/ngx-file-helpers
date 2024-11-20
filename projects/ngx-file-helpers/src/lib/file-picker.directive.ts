import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  booleanAttribute,
  inject,
  input,
  output
} from '@angular/core';
import { FileHandler } from './file-handler';
import { ReadFile } from './read-file';

@Directive({
  standalone: true,
  selector: '[ngxFilePicker]',
  exportAs: 'ngxFilePicker',
})
export class FilePickerDirective extends FileHandler implements OnInit {
  readonly #el = inject(ElementRef);
  readonly #renderer = inject(Renderer2);

  public readonly accept = input('');

  public readonly multiple = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  public readonly filePick = output<ReadFile>();

  private _input?: HTMLInputElement;

  public ngOnInit() {
    this._input = this.#renderer.createElement('input');
    this.#renderer.appendChild(this.#el.nativeElement, this._input);

    this.#renderer.setAttribute(this._input, 'type', 'file');
    this.#renderer.setAttribute(this._input, 'accept', this.accept());
    this.#renderer.setStyle(this._input, 'display', 'none');

    if (this.multiple()) {
      this.#renderer.setAttribute(this._input, 'multiple', 'multiple');
    }

    this.#renderer.listen(this._input, 'change', (event: Event) =>
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

    this._input.value = '';
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

    if (target.files !== null) {
      this.readFiles(target.files, (readFile) => this.filePick.emit(readFile))
        // reset value to trick change event making it changeable every time
        .finally(() => (target.value = ''));
    }
  }
}
