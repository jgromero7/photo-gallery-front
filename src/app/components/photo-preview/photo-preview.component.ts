import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// Service
import { PhotoService } from '../../services/photo.service';

// Models
import { Photo } from '../../interfaces/photo';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  public photo: Photo;
  public _id: string;

  constructor(private _photoS: PhotoService,
              private router: Router,
              private activateRouter: ActivatedRoute) { }

  ngOnInit() {
    this._id = this.activateRouter.snapshot.paramMap.get('id');
    this._photoS.getPhotoByID(this._id).subscribe((res:any) => {
      this.photo = res.data;
    },
    error => {
      console.log()
    })
  }

  public updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this._photoS.updatePhoto(this._id, title.value, description.value).subscribe((res: any) => {
      if (res.data) {
        this.router.navigate(['/photos']);
      }
    },
    error => {
      console.log(error);
    });

    return false;
  }

  public deletePhoto(id: string) {
    this._photoS.deletePhoto(id).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/photos']);
    },
    error => {
      console.log(error);
    })
  }

}
