import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from '../../../../models/order';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../services/order.service';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-order-add',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss',
})
export class OrderAddComponent {
  createForm!: FormGroup;
  users!:User[];
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private userService:UserService
  ) {}
  
  getUserList(){
    this.userService.getAll().subscribe(result=>{
      this.users=result.data
    })
  }

  createOrderForm() {
    this.createForm = this.formBuilder.group({
      fullName:['',Validators.required],
      Email:['',Validators.required],
      cargoBranch:['',Validators.required],
      sendDate:['',Validators.required],
      sendCode:['',Validators.required],
    });
  }
  onSubmit() {
    if (!this.createForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let order: Order = Object.assign({}, this.createForm.value);
    this.orderService.create(order).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.create-order-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
