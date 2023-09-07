import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}episode`);
  }

  getEpisode(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}episode/${id}`);
  }
}
