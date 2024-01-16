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
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-appointment-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-update.component.html',
  styleUrl: './appointment-update.component.scss',
})
export class AppointmentUpdateComponent {
  appointments!:Appointment;
  @Input() users!:User[];
  updateForm!: FormGroup;
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private appointmentService: AppointmentService,
    private userService:UserService
  ) {}

  getUsersList(appointment:Appointment){
    this.userService.getAll().subscribe(result=>{
      this.createUpdateForm(appointment);
    })
  }

  createUpdateForm(appointment: Appointment) {
    this.updateForm = this.formBuilder.group({
      id: [appointment.id, Validators.required],
      userId: [appointment.userId, Validators.required],
      fullName: [appointment.fullName, Validators.required],
      phoneNumber: [appointment.phoneNumber, Validators.required],
      email: [appointment.email, Validators.required],
      startDate: [appointment.startDate, Validators.required],
      endDate: [appointment.endDate, Validators.required],
      isCompleted:[appointment.isCompleted]
    });
  }
  onSubmit() {
    if (!this.updateForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let appointment: Appointment = Object.assign(this.updateForm.value);
    this.appointmentService.update(appointment).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.edit-appointment-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
