import { Component, OnInit, NgZone } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Marker } from '../../interfaces/marker';
import { Store } from '../../interfaces/store';
import { Location } from '@angular/common';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  lat: 0;
  lng: 0;
  zoom: number = 15;

  store: Store;
  marker: Marker;

  constructor(private loader: MapsAPILoader,
   private _zone: NgZone,
   private backendService: BackendService,
   private flashMessage: FlashMessagesService,
   private activatedRoute: ActivatedRoute,
   private _location: Location) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        const id = params['id'];
        this.backendService.getStore(id).subscribe(store => {
          this.store = store;
          this.marker = {
            lat: this.store.lat,
            lng: this.store.lng,
            label: this.store.name,
            draggable: false
          };
        },
        err => {
          console.log(err);
          return false;
        });
      });
  }

  goBack(){
    this._location.back();
  }
}
