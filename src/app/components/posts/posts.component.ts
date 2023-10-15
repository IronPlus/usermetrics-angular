import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, map, shareReplay } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  totalPosts = 0;
  pageSize = 5;
  currentPage = 1;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts().pipe(
      shareReplay(1) // Prevent multiple executions
    );

    this.posts$.subscribe((posts) => (this.totalPosts = posts.length));
  }

  get pagedPosts$(): Observable<Post[]> {
    return this.posts$.pipe(
      map((posts) => {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;

        return posts.slice(startIndex, endIndex);
      })
    );
  }

  onChangePage(pe: PageEvent) {
    this.pageSize = pe.pageSize;
    this.currentPage = pe.pageIndex + 1;
  }
}
