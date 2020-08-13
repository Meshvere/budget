import { Injectable } from '@angular/core';
import { faCheckCircle, IconDefinition, faCircle, IconPrefix, IconName, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';

@Injectable({
  providedIn: 'root'
})
export class IconService {
  public checkCircle:IconDefinition = faCheckCircle;
  public circle:IconDefinition = faCircle;
  public edit:IconDefinition = faEdit;
  public remove:IconDefinition = faTrash;

  constructor(private _library: FaIconLibrary) {
    this._library.addIcons(faCheckCircle, faCircle)
  }
}
