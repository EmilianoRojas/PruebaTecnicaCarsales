import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EpisodeResponse } from '../models/episode-response.model';
import { Episode } from '../models/episode.model';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/';

  constructor(private http: HttpClient) { }

  getEpisodes(): Observable<EpisodeResponse> {
    return this.http.get<EpisodeResponse>(`${this.apiUrl}episode`);
  }

  getEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}episode/${id}`);
  }

  getMultipleCharacters(characterIds: number[]): Observable<Character[]> {
    const url = `${this.apiUrl}/character/[${characterIds.join(',')}]`;
    return this.http.get<Character[]>(url);
  }

}
