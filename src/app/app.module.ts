import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { PostsComponent } from './components/posts/posts.component';

@NgModule({
  declarations: [AppComponent, PostsComponent, DashboardsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
