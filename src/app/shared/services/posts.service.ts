import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Iposts } from '../module/posts.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  baseUrl : string = `${environment.baseUrl}`;
  postsUrl : string = `${environment.baseUrl}/posts.json`;
  
  constructor(
    private _http : HttpClient
  ) { }

  fetchAllPosts():Observable<Array<Iposts>>{
      return this._http.get<Array<Iposts>>(this.postsUrl)
                  .pipe(
                    map(data =>{
                      console.log(data)
                      let postsArr : Array<Iposts> = []
                      for (const key in data) {
                        postsArr.unshift({...data[key], id: key})
                      }
                      console.log(postsArr);
                      return postsArr
                    })
                  )
      }
  
  fetchSinglePosts(id : string):Observable<Iposts>{
      let singlePostsUrl = `${this.baseUrl}/posts/${id}.json`
      return this._http.get<Iposts>(singlePostsUrl)
  }

  removePosts(id : string):Observable<null>{
      let removePostsUrl = `${this.baseUrl}/posts/${id}.json`
      return this._http.delete<null>(removePostsUrl)
  }

  newPosts(post : Iposts):Observable<Iposts>{
     return this._http.post<Iposts>(this.postsUrl, post)
  }

  updatePosts(updObj : Iposts):Observable<Iposts>{
    let updUrl = `${this.baseUrl}/posts/${updObj.id}.json`;
    return this._http.patch<Iposts>(updUrl, updObj)
  }
}
