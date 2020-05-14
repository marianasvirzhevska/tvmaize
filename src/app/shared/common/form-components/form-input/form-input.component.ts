import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
  @Input() controlName: FormControl;
  @Input() parentForm: FormGroup;
  @Input() label: string;
  @Input() placeholder: string;

}
