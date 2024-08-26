import { Component, Input, OnInit } from '@angular/core';
import { Iposts } from '../../module/posts.interface';

@Component({
  selector: 'app-postscard',
  templateUrl: './postscard.component.html',
  styleUrls: ['./postscard.component.scss']
})
export class PostscardComponent implements OnInit {

  @Input() postObj !: Iposts

  constructor() { }

  ngOnInit(): void {
  }

}
