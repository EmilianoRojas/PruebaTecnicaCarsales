import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Character } from 'src/app/models/character.model';
import { Episode } from 'src/app/models/episode.model';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {
  episode$ = new Observable<Episode>();
  characters$ = new Observable<Character[]>(); 
  isLoading: boolean = true;
  episodeId: number = 0;
  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rickAndMortyService: RickAndMortyService
  ) { }

  ngOnInit() {
    console.log(this.data)
    this.episodeId = this.data.episodeId;
    this.episode$ = this.rickAndMortyService.getEpisode(this.episodeId);

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
