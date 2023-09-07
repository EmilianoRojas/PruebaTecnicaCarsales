import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';

const routes: Routes = [
  { path: 'episodes', component: EpisodeListComponent },
  { path: 'episode/:id', component: EpisodeDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
