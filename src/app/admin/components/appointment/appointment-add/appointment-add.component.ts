import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Appointment } from '../../../../models/appointment';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../../../services/appointment.service';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-appointment-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss',
})
export class AppointmentAddComponent {
  createForm!: FormGroup;
  users!:User[];
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private appointmentService: AppointmentService,
    private userService:UserService
  ) {}
  
  getUserList(){
    this.userService.getAll().subscribe(result=>{
      this.users=result.data
    })
  }

  createAppointmentForm() {
    this.createForm = this.formBuilder.group({
      userId:['',Validators.required],
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }
  onSubmit() {
    if (!this.createForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let appointment: Appointment = Object.assign({}, this.createForm.value);
    this.appointmentService.create(appointment).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.create-appointment-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
