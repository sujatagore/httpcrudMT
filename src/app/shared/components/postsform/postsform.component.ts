import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Iposts } from '../../module/posts.interface';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-postsform',
  templateUrl: './postsform.component.html',
  styleUrls: ['./postsform.component.scss']
})
export class PostsformComponent implements OnInit {

  PostsForm !: FormGroup;
  isinEditMode : boolean = false;
  postsId !: string;
  postsObj !: Iposts

  constructor(
    private _postsService : PostsService,
    private _route : ActivatedRoute,
    private _router : Router,
    private _snackBar : SnackbarService
  ) { }

  ngOnInit(): void {
    this.createPostsForm();
    this.formMode()
  }

  createPostsForm(){
    this.PostsForm = new FormGroup({
      content : new FormControl(null, [Validators.required]),
      title : new FormControl(null, [Validators.required]),
      userId : new FormControl(1, [Validators.required])
    })
  }

  formMode(){
      this.postsId = this._route.snapshot.params['postsId'];
      if (this.postsId) {
        this.isinEditMode = true;
        this._postsService.fetchSinglePosts(this.postsId)
            .subscribe(res =>{
              this.postsObj = res;
              this.PostsForm.patchValue(this.postsObj)
            })
      } else {
        this.isinEditMode = false;
      }
  }

  onPostsUpdate(){
    if (this.PostsForm.valid) {
      let uptObj = {...this.PostsForm.value, id: this.postsId}
      this._postsService.updatePosts(uptObj)
        .subscribe(res =>{
          console.log(res)
          this.PostsForm.reset();
          this._router.navigate(['/posts']);
          this._snackBar.openSnackBar(`The Posts ${uptObj.title} is updated successfully!!!`)
        })
    }
  }

  onPostsAdd(){
    if (this.PostsForm.valid) {
      let newPost = this.PostsForm.value;
      this.PostsForm.reset()
      this._postsService.newPosts(newPost)
        .subscribe(res =>{
          console.log(res);
          this._router.navigate(['/posts'])
          this._snackBar.openSnackBar(`The Posts ${newPost.title} is added Successfully!!!!`)
        })
    }
  }

  get pc(){
    return this.PostsForm.controls
  }
}
