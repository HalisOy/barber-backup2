import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { CommonModule } from '@angular/common';
import { OrderUpdateComponent } from './order-update/order-update.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,OrderUpdateComponent,OrderAddComponent,RouterLink],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  users!:User[];
  orders:Order[]=[]
  selectedOrder!:Order
  @ViewChild(OrderAddComponent,{static:true}) addOrderComponent !: OrderAddComponent; 
  @ViewChild(OrderUpdateComponent,{static:true}) updateOrderComponent !: OrderUpdateComponent; 
  constructor(
    private orderService:OrderService,
    private userService:UserService){}
  ngOnInit(): void {
    this.getList();
  }

  getList(){
    this.userService.getAll().subscribe(result=>{
      this.users=result.data;
    })
    this.orderService.getAll().subscribe(result=>{
      this.orders=result.data;
    });
  }

  showAddModal(){
    this.addOrderComponent.getUserList();
    this.addOrderComponent.createOrderForm();
  }
  showEditModal(order:Order|null){
    if(order==null) return;
    this.updateOrderComponent.createUpdateForm(order);
  }
  deleteOrderById(id:number){
    this.orderService.deleteById(id).subscribe(result=>{
      this.getList();
    })
  }
}
