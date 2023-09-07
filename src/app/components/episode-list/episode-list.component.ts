
import { Component, OnInit } from '@angular/core';
import { Observable, map, of, catchError } from 'rxjs';
import { EpisodeResponse } from 'src/app/models/episode-response.model';
import { Episode } from 'src/app/models/episode.model';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css']
})
export class EpisodeListComponent implements OnInit {
  episodes$: Observable<Episode[]> = new Observable<Episode[]>()

  constructor(private rickAndMortyService: RickAndMortyService) { }

  ngOnInit() {
    this.episodes$ = this.rickAndMortyService.getEpisodes()
      .pipe(
        // Mapea la respuesta a un arreglo de episodios si es necesario
        map((response: EpisodeResponse) => response.results),
        catchError(() => of([])) // Maneja errores devolviendo un arreglo vacío
      );
  }
}
