import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/models/episode.model';

@Component({
  selector: 'app-episode-table',
  templateUrl: './episode-table.component.html',
  styleUrls: ['./episode-table.component.css']
})
export class EpisodeTableComponent implements OnInit{
  @Input()episodes!: Observable<Episode[]>;
  displayedColumns: string[] = ['name', 'air_date', 'season', 'actions'];

  ngOnInit(): void {
  }
}
