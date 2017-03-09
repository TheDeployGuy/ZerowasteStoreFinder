import { Component, OnInit, NgZone } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(private loader: MapsAPILoader,
   private _zone: NgZone,
   private backendService: BackendService,
   private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.backendService.getStore("[Insert store id here]").subscribe(data => {
      if(data.success){
        // Assign data to class variables here
      }else{
        this.flashMessage.show('Something went wrong...', {cssClass:'alert-danger', timeout: 3000});
      }
    });
  }

}
