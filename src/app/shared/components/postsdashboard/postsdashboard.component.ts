import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Iposts } from '../../module/posts.interface';

@Component({
  selector: 'app-postsdashboard',
  templateUrl: './postsdashboard.component.html',
  styleUrls: ['./postsdashboard.component.scss']
})
export class PostsdashboardComponent implements OnInit {

  postsObj !: Array<Iposts> 

  constructor(
    private _postsService : PostsService
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
      this._postsService.fetchAllPosts()
          .subscribe(res =>{
            console.log(res)
            this.postsObj = res
          })
  }

}
