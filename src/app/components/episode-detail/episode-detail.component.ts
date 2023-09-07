// episode-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css']
})
export class EpisodeDetailComponent implements OnInit {
  episode$!: Observable<Episode>;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) { }

  ngOnInit() {
    
    this.route.params.subscribe(params  => {
      if (params['id']) {
        const episodeId = params['id']; 
        this.episode$ = this.rickAndMortyService.getEpisode(episodeId);

        this.episode$.subscribe((episode: Episode) => {
          console.log(episode);
        });
      } 
    });
    
  }

}
