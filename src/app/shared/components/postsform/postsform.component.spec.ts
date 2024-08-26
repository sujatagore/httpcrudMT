import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsformComponent } from './postsform.component';

describe('PostsformComponent', () => {
  let component: PostsformComponent;
  let fixture: ComponentFixture<PostsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
