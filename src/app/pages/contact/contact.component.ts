import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/pages/contact/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [DataService],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  private isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private fb: FormBuilder, private dataSvc: DataService) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSave(): Promise<void> {
    if (this.contactForm.valid) {
      try {
        // console.log(this.contactForm.value);
        const formValue = this.contactForm.value;
        await this.dataSvc.onSaveContact(formValue);
        Swal.fire('Message sent!', 'See you soon!', 'success');
        this.contactForm.reset();
      } catch (error) {
        alert(error);
      }
    } else {
      Swal.fire('Oops.....', 'Please check the form data', 'error');
    }
  }

  /**
   * *Recibe como argumento el campo del formulario y de acuerdo a la validación que reciba carga la clase css adecuada
   */
  isValidField(field: string): string {
    const validatedField = this.contactForm.get(field);
    return !validatedField?.valid && validatedField?.touched
      ? 'is-invalid'
      : validatedField?.touched
      ? 'is-valid'
      : '';
  }

  notRequiredHasValue(field: string): string {
    return this.contactForm.get(field)?.value ? 'is-valid' : '';
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      message: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });
  }
}
