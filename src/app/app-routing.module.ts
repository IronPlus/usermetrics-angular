import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  {
    path: 'posts',
    component: PostsComponent,
  },
  { path: 'dashboards', component: DashboardsComponent },
  { path: '**', redirectTo: 'posts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
