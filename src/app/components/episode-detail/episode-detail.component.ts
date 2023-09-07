import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Character } from 'src/app/models/character.model';
import { Episode } from 'src/app/models/episode.model';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {
  episode$ = new Observable<Episode>();
  characters$ = new Observable<Character[]>(); 
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) { }

  ngOnInit() {
    this.episode$ = this.route.params.pipe(
      switchMap(params => {
        if (params['id']) {
          const episodeId = params['id'];
          return this.rickAndMortyService.getEpisode(episodeId);
        }
        return []
      })

    );

    this.characters$ = this.episode$.pipe(
      switchMap(episode => {
        if (episode && episode.characters && episode.characters.length > 0) {
          const characterIds = episode.characters.map(url =>
            this.extractCharacterIdFromUrl(url)
          );
          return this.rickAndMortyService.getMultipleCharacters(characterIds);
        }
        return [];
      })
    );

    this.characters$.subscribe(() => {
      this.isLoading = false;
    });
  }

  private extractCharacterIdFromUrl(url: string): number {
    // Extrae el ID del personaje de la URL
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1], 10);
  }
}
