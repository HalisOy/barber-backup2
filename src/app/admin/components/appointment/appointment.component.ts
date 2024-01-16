import { Component, OnInit, ViewChild } from '@angular/core';
import { AppointmentService } from '../../../services/appointment.service';
import { Appointment } from '../../../models/appointment';
import { CommonModule } from '@angular/common';
import { AppointmentUpdateComponent } from './appointment-update/appointment-update.component';
import { AppointmentAddComponent } from './appointment-add/appointment-add.component';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule,AppointmentUpdateComponent,AppointmentAddComponent,RouterLink],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  users!:User[];
  appointments:Appointment[]=[]
  selectedAppointment!:Appointment
  @ViewChild(AppointmentAddComponent,{static:true}) addAppointmentComponent !: AppointmentAddComponent; 
  @ViewChild(AppointmentUpdateComponent,{static:true}) updateAppointmentComponent !: AppointmentUpdateComponent; 
  constructor(
    private appointmentService:AppointmentService,
    private userService:UserService){}
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.userService.getAll().subscribe(result=>{
      this.users=result.data;
    })
    this.appointmentService.getAll().subscribe(result=>{
      this.appointments=result.data;
    });
  }
  getUserFullNameById(id:number){
    let selectedUser = this.users.find(user=>user.id == id)
    return selectedUser?.firstName + " " + selectedUser?.lastName
  }
  showAddModal(){
    this.addAppointmentComponent.getUserList();
    this.addAppointmentComponent.createAppointmentForm();
  }
  showEditModal(appointment:Appointment|null){
    if(appointment==null) return;
    // this.updateAppointmentComponent.createUpdateForm(appointment);
    this.updateAppointmentComponent.getUsersList(appointment);
  }
  deleteAppointmentById(id:number){
    this.appointmentService.deleteById(id).subscribe(result=>{
      this.getList();
    })
  }
}
