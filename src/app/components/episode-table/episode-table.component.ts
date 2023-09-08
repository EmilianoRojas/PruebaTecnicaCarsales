import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';
import { EpisodeDetailComponent } from '../episode-detail/episode-detail.component';

@Component({
  selector: 'app-episode-table',
  templateUrl: './episode-table.component.html',
  styleUrls: ['./episode-table.component.css']
})
export class EpisodeTableComponent implements OnInit{
  @Input()episodes!: Observable<Episode[]>;
  displayedColumns: string[] = ['name', 'air_date', 'season', 'actions'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openEpisodeDetails(episode: Episode) {
    this.dialog.open(EpisodeDetailComponent, {
      data: { episode: episode, episodeId: episode.id },
      height: '700px'
    });
  }
}
