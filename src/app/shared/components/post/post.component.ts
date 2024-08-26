import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Iposts } from '../../module/posts.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  postsId !: string;
  postsObj !: Iposts

  constructor(
    private _postsService : PostsService,
    private _route : ActivatedRoute,
    private _router : Router,
    private _snackBar : SnackbarService,
    private _matDailog : MatDialog
  ) { }

  ngOnInit(): void {
    this.getSinglePost()
  }

  getSinglePost(){
      this.postsId = this._route.snapshot.params['postsId']
      this._postsService.fetchSinglePosts(this.postsId)
        .subscribe(res =>{
          this.postsObj = res
          console.log(this.postsObj);
        })
  }

  onPostsRemove(){
    let matDialogConf = new MatDialogConfig()
    matDialogConf.width = '500px';
    matDialogConf.disableClose = true;
    matDialogConf.data = `Are You sure you want to remove Posts?`
    let matDialogRef = this._matDailog.open(ConfirmComponent, matDialogConf)

    matDialogRef.afterClosed()
      .subscribe(res =>{
        if (res) {
          this._postsService.removePosts(this.postsId)
            .subscribe(res =>{
              console.log(res);
              this._router.navigate(['/posts']);
              this._snackBar.openSnackBar(`The Posts ${this.postsObj.title} is Removed successfully!!`)
            })
        }
      })

    
  }

}
