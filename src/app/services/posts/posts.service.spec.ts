import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Post } from 'src/app/models/post.model';
import { environment } from 'src/environments/environment';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve posts from the API via GET', () => {
    const mockPosts: Post[] = [
      {
        id: '1',
        from_name: 'John',
        from_id: '1',
        message: 'msg-1',
        type: 'type-1',
        created_time: '2021-01-01',
      },
      {
        id: '2',
        from_name: 'Alice',
        from_id: '2',
        message: 'msg-2',
        type: 'type-2',
        created_time: '2021-02-02',
      },
    ];

    service.getPosts().subscribe((posts) => {
      expect(posts.length).toBe(2);
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne(environment.dataUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockPosts);
  });
});
