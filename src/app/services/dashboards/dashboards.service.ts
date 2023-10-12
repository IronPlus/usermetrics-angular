import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Dashboard } from 'src/app/models/dashboard.model';
import { Post, UserPosts } from 'src/app/models/post.model';
import { PostsService } from '../posts/posts.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  constructor(private postsService: PostsService) {}

  getDashBoards(): Observable<Dashboard[]> {
    const userPostsArray: UserPosts[] = [];
    const userIds: string[] = [];

    return this.postsService.getPosts().pipe(
      map((posts: Post[]) => {
        posts.forEach((post: Post) => {
          if (!userIds.includes(post.from_id)) {
            userIds.push(post.from_id);
            userPostsArray.push({
              user_id: post.from_id,
              name: post.from_name,
              posts: [],
            });
          }

          userPostsArray.forEach((userPosts) => {
            if (userPosts.user_id === post.from_id) {
              userPosts.posts.push(post);
            }
          });
        });

        return this.createDashboards(userPostsArray);
      })
    );
  }

  createDashboards(userPostsArray: UserPosts[]): Dashboard[] {
    const dashboards: Dashboard[] = [];

    userPostsArray.forEach((userPosts) => {
      dashboards.push({
        user_id: userPosts.user_id,
        name: userPosts.name,
        total_posts: userPosts.posts.length,
        median_num_of_chars: this.findMedian(userPosts),
        monthly_posts_statistics: this.createMonthlyPostsStatistics(userPosts),
        longest_post: this.findLongestPost(userPosts),
      });
    });

    return dashboards;
  }

  findMedian(userPosts: UserPosts): number {
    let lengths: number[] = [];

    userPosts.posts.forEach((post) => {
      lengths.push(post.message.trim().length);
    });

    lengths = lengths.sort((a, b) => a - b);

    const mid = Math.floor(lengths.length / 2);

    return lengths.length % 2 === 0
      ? (lengths[mid - 1] + lengths[mid]) / 2
      : lengths[mid];
  }

  createMonthlyPostsStatistics(userPosts: UserPosts): number[] {
    const statistics = new Array(12).fill(0);

    userPosts.posts.forEach(
      ({ created_time }) => (statistics[new Date(created_time).getMonth()] += 1)
    );

    return statistics;
  }

  findLongestPost(userPosts: UserPosts): string {
    const lengths: number[] = [];

    userPosts.posts.forEach((post) => {
      lengths.push(post.message.length);
    });

    const longest = Math.max(...lengths);
    const index = lengths.findIndex((length) => length === longest);

    return userPosts.posts[index].message;
  }
}
