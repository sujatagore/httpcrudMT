import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'httpcrudMT';

  isLoading : boolean = false;

  constructor(
    private _loaderService : LoaderService
  ){}

  ngOnInit(){
      this._loaderService.loaderStatus$
          .subscribe(res =>{
            this.isLoading = res
          })
  }
}
