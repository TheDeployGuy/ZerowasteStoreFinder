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
  constructor(
    private flashMessage: FlashMessagesService,
    private backendService: BackendService,
    private router: Router
  ) { }

  ngOnInit() {
    this.backendService.getAllStores().subscribe(stores => {
      this.allStores = stores;
    });
  }

  deleteStore(storeId, i){
    console.log(storeId);
    console.log(i);
    this.backendService.deleteStore(storeId).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Store deleted', {cssClass:'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      }
      else{
        this.flashMessage.show('Deleting store failed', {cssClass:'alert-danger', timeout: 3000});
      }
    });
  }

}
