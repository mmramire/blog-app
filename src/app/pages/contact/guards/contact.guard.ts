import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ContactComponent } from '../contact.component';

@Injectable()
export class ContactGuard implements CanDeactivate<ContactComponent> {
  canDeactivate(
    component: ContactComponent
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.contactForm.dirty) {
      const name = component.contactForm.get('name')!.value || 'Dear user';
      return Swal.fire({
        title: `${name} are you sure you want to leave without saving?`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        return result.isConfirmed ? true : false;
      });
    }
    return true;
  }
}
