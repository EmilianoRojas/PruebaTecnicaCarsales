
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  episodes$: Observable<Episode[]> = new Observable<Episode[]>();
  episodeResponse: EpisodeResponse | null = null;
  currentPage = 1;
  pageSize = 20; 

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    this.episodes$ = this.rickAndMortyService.getEpisodes(this.currentPage)
      .pipe(
        map((response: EpisodeResponse) => {
          this.episodeResponse = response;
          return response.results;
        }),
        catchError(() => of([]))
      );
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadEpisodes();
  }

}
