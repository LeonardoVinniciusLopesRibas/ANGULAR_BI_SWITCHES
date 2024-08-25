import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Switches } from '../model/switches';

@Injectable({
  providedIn: 'root'
})
export class SwitchesService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/switches";

  constructor() { }

  get(query: string): Observable<Switches[]>{
    const params = new HttpParams().set('query', query);
    return this.http.get<Switches[]>(this.API + '/get', {params});
  }
}
