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
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-order-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-update.component.html',
  styleUrl: './order-update.component.scss',
})
export class OrderUpdateComponent {
  orders!:Order;
  users!:User[];
  updateForm!: FormGroup;
  @Output() onLoad: EventEmitter<unknown> = new EventEmitter();
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private orderService: OrderService,
  ) {}

  createUpdateForm(order: Order) {
    this.updateForm = this.formBuilder.group({
      id: [order.id, Validators.required],
      fullName: [order.fullName, Validators.required],
      email: [order.email, Validators.required],
      cargoBranch: [order.cargoBranch, Validators.required],
      sendDate: [order.sendDate, Validators.required],
      sendCode: [order.sendCode, Validators.required],
    });
  }
  onSubmit() {
    if (!this.updateForm.valid) {
      this.toastrService.warning('Please check the form.', 'Warning');
      return;
    }
    let order: Order = Object.assign(this.updateForm.value);
    this.orderService.update(order).subscribe((result) => {
      if (typeof document == undefined) return;
      document.querySelector('.edit-order-modal')?.classList.toggle('show');
      document.querySelector('.modal-backdrop')?.classList.toggle('show');
      this.onLoad.emit();
    });
  }
}
