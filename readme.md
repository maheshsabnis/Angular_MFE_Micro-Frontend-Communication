# Communication between Shell and Federated Modules using CustomEvent

- CustomEvent interface represents events initialized by an application for any purpose. This helps to define an event bus using which data sharing and communication can be implemented across Shell and the Currently Loaded Micro-Frontend User Interface

- In the previous step-by-step explanation I have explained the Angular Micro-Frontend implementation using Module Federation. You can download zip or clone the application using the following command. Please go through the readme for the PORT Configurations to run the commands 

````html
git clone https://github.com/maheshsabnis/Angular_MFE_Micro-Frontend.git
````

- Open the Project in VSCode and restore all node packages

# Using the CustomEvent

- Modify the app.component.ts file in 'ecomm-host\projects\ecomm-shell\src\app' path by defining the CustomEvent as follows

````javascript
/* declare the following variable at the component level */
filterValue:string = '';
filterNotification() {
    const event = new CustomEvent('filter_event', {
      detail: {
        name: this.filterValue,
      }
    });
    window.dispatchEvent(event);
  }
````
The CustomEvent defines the payload (data to be shared) using the 'name' property. 


- Modify the app.component.html file in the same path to define event binding as follows

````html
<div class="container form-group">
  <label for="">
    <strong>Enter Search String Here </strong>
  </label>
  <input type="text" class="form-control" placeholder="Enter the search"
   [(ngModel)]="filterValue"
    (change)="filterNotification()"
  >
</div>
````
- Here we have bounded the filterNotification() method to the change event of the input elemenet. The filterNotification() defines a CustomEvent named 'filter_event' and the `filterValue:string` string variable is bound with the input element. When the data is entered in this inout element, the currently loaded DOM can subscribe to this event.

# Subscribe to the CustomEvent

- Open 'customer-list.component.ts' from the 'customer-mf\projects\customer-mfe\src\app\customer\components' path.

- In this file we will add a new Array object named '_FiltededCustomers' and we will also define a readonly property so that when the CustomerListComponent subscribe to the filter_event, the data received from the event will be used to filter data. The code in the CustomerListComponent can be seen as follows

````javascript
import { Component, OnInit, Input } from '@angular/core';
import { Customer } from '../../../models/app.customer.model';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
   Customers:Array<Customer>;
   private _FiltededCustomers:Array<Customer>;

   private filter:string;

   constructor(){
      this.filter = '';
      this.Customers = new Array<Customer>();
      this._FiltededCustomers = new Array<Customer>();
      this.Customers.push(new Customer(101,'Mahesh','mahesh@abc.com', 123456));
       this.Customers.push(new Customer(102,'Tejas','tejas@abc.com', 223456));
       this.Customers.push(new Customer(103,'Vivek','vivek@abc.com', 323456));
       this.Customers.push(new Customer(104,'Satish','satish@abc.com', 423456));
       this.Customers.push(new Customer(105,'Mukesh','mukesh@abc.com', 523456));
       this.Customers.push(new Customer(106,'Sandeep','sandeep@abc.com', 623456));
       this.Customers.push(new Customer(107,'Vinay','vinay@abc.com', 723456));
       this.Customers.push(new Customer(108,'Tushar','tushar@abc.com', 823456));
       this.Customers.push(new Customer(109,'Kaustubh','kaustubh@abc.com', 923456));
       this.Customers.push(new Customer(110,'Aditya','aditya@abc.com', 213456));

   }

   ngOnInit(): void {
    window.addEventListener('filter_event', (e: any) => {
      console.log(`Customer ${e.detail.name}`);
      this.filter = e.detail.name;
      console.log(`Customer Filter ${this.filter}`);
    });
   }



   get FilteredCustomers():Array<Customer>{
      if(this.filter === ''){
        this._FiltededCustomers = this.Customers;
      } else {
        this._FiltededCustomers = this.Customers.filter((c,i)=>{
          return c.CustomerName === this.filter;
        });
      }
      return this._FiltededCustomers;
   }
}


````

- As seen in the code, the CustomerListComponent subscribe to the 'filter_event' and receive the data from the shell app can be used to filter data.

- Now run all the applications as follows

````javascript
/* Customer-mf */
ng serve --port 4200

````

````javascript
/* Inventory-mf */
ng serve --port 4300

````

````javascript
/* Orders-mf */
ng serve --port 4400

````

````javascript
/* ecomm-mf */
ng serve --port 5200

````

This will show the page in browser, click on the 'Customers' link and then enter 'CustomerName' value in the textbox, this will show only those customers matchoing with that name.

````html
<strong>
 Using the CustomEvent, we can easily establish communication across the Shell and the currently loaded DOM
</strong>
````





