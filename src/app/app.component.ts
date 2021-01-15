import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {
  MyWorker,
  MyWorkersDatabase,
  MyWorkerType,
} from './shared/worker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Список сотрудников';
  workers: MyWorker[] = MyWorkersDatabase;
  myWorkerType = MyWorkerType;
  workerEdit: any;
  id: any;
  name: any;
  surname: any;
  phone: any
  type: any;
  modal = false;

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    id: new FormControl(''),
  });

  public mask = ['+', 7, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];



  getByType(type: number) {
    return this.workers.filter((worker) => worker.type === type);
  }

  onDeleteById(id: number) {
    let index = this.workers.findIndex((worker) => worker.id === id);
    if (index !== -1) {
      this.workers.splice(index, 1);
    }
  }

  onAddWorker(worker) {
    let id =
      this.workers.length > 0
        ? this.workers[this.workers.length - 1].id + 1
        : 1;
    worker.id = id;
    this.workers.push(worker);
  }

  onEditById(worker){
    this.workerEdit = worker;
    this.modal = !this.modal;
    this.id = this.workerEdit.id;
    this.name = this.workerEdit.name;
    this.surname = this.workerEdit.surname;
    this.phone = this.workerEdit.phone;
    this.type = this.workerEdit.type;
  }
  
  onEditData(worker){
    this.workers[this.workerEdit.id - 1].name = this.name;
    this.workers[this.workerEdit.id - 1].surname = this.surname;
    this.workers[this.workerEdit.id - 1].phone = this.phone;
    this.workers[this.workerEdit.id - 1].type = this.type;
    this.modal = !this.modal;
  }

  onClose(): void{
    this.modal = !this.modal;
  }
}
