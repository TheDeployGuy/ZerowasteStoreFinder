import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { Store } from '../../interfaces/store';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allStores: Store[] = [];
  messages: any = [];
  constructor(
    private flashMessage: FlashMessagesService,
    private backendService: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.backendService.getAllStores().subscribe(stores => {
      this.allStores = stores;
    });

    this.backendService.getMessages().subscribe(messages => {
      this.messages = messages;
    });
  }

  deleteStore(storeId, index){
    this.backendService.deleteStore(storeId).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass:'alert-success', timeout: 3000});
        this.allStores.splice(index, 1);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
      }
    });
  }

  updateStore(store, index){
    const updatedStore = store;
    // Typescript is type safe need to cast...
    updatedStore.products = (<HTMLInputElement>document.getElementById('products'+index)).value
    this.backendService.editStore(updatedStore).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Store updated', {cssClass:'alert-success', timeout: 3000});
      }else{
        this.flashMessage.show('Store update failed...', {cssClass:'alert-danger', timeout: 3000});
      }
    });
  }

  deleteMessage(messageId, index){
    this.backendService.deleteMessage(messageId).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass:'alert-success', timeout: 3000});
        this.messages.splice(index, 1);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.flashMessage.show(data.msg, {cssClass:'alert-danger', timeout: 3000});
      }
    });
  }

}
