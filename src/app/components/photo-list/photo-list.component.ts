import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

// Models
import { Photo } from '../../interfaces/photo';

// Services
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  public photoList: Photo[];

  constructor(private _photoS: PhotoService,
              private router: Router) { }

  ngOnInit() {
    this._photoS.getPhoto().subscribe((res: any) => {
      this.photoList = res.data;
    },
    error => {
      console.log(error);
    })
  }

  public selectedCard(id: string) {
    this.router.navigate(['/photos', id]);
  }

}
