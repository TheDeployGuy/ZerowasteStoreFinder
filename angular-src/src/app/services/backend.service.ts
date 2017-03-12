import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {
  headers: Headers = new Headers();

  constructor(private http:Http) {
    this.headers.append('Content-Type','application/json');
  }

  searchStores(query){
    return this.http.get('http://localhost:3000/api/stores/search/' + query, {headers: this.headers})
      .map(res => res.json());
  }

  addStore(store){
    return this.http.post('http://localhost:3000/api/stores/addStore', store, {headers: this.headers})
      .map(res => res.json());
  }

  getStore(storeID){
    return this.http.get('http://localhost:3000/api/stores/'+storeID, {headers: this.headers})
      .map(res => res.json());
  }

  getAllStores(){
    return this.http.get('http://localhost:3000/api/stores/all', {headers: this.headers})
      .map(res => res.json());
  }
}
