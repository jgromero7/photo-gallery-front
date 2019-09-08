import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

// Import Models
import { Photo } from '../interfaces/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private apiURL = environment.API_REST.APP_BACKEND;
  private apiMethod = 'photo';

  constructor(private _http: HttpClient) { }

  public getPhoto() {
    const uri = this.joinAPIURL(this.apiMethod);
    return this._http.get<Photo[]>(uri);
  }

  public getPhotoByID(id: string) {
    const uri = this.joinAPIURL(this.apiMethod);
    return this._http.get<Photo>(uri + `/${id}`);
  }
  
  public createPhoto(title: string, description: string, photo: File) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('description', description);
    fd.append('image', photo);

    const uri = this.joinAPIURL(this.apiMethod);
    return this._http.post<Photo>(uri, fd);
  }

  public updatePhoto(id: string, title: string, description: string,) {
    const uri = this.joinAPIURL(this.apiMethod);
    return this._http.put<Photo>(uri + `/${id}`, { title, description });
  }

  public deletePhoto(id: string) {
    const uri = this.joinAPIURL(this.apiMethod);
    return this._http.delete<Photo>(uri + `/${id}`);
  }

  private joinAPIURL(method: string): string {
    return this.apiURL + method;
  }
}
