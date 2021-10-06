//Todo el código referenten a la conexión de Firebase

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Contact {
  name: string;
  lastName?: string;
  email: string;
  id: string;
  message: string;
}

@Injectable()
export class DataService {
  contacts!: Observable<Contact>;
  private contactsCollection!: AngularFirestoreCollection<Contact>;

  constructor(private readonly afs: AngularFirestore) {
    this.contactsCollection = afs.collection<Contact>('contacts');
  }

  async onSaveContact(contactForm: Contact): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const id = this.afs.createId();
        const data = { ...contactForm };
        const result = this.contactsCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        if (error instanceof Error) {
          reject(error.message);
        }
      }
    });
  }
}
