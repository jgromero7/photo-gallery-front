import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Services
import { PhotoService } from '../../services/photo.service';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  public file: File;
  public photoSelected: string | ArrayBuffer;

  constructor(private _photoS: PhotoService,
              private router: Router) { }

  ngOnInit() {
  }

  public onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // Image Preview
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  public onUploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this._photoS.createPhoto(title.value, description.value, this.file).subscribe((res: any) => {
      if (res.data) {
        this.router.navigate(['/photos']);
      }
    },
    error => {
      console.log(error);
    })
    return false;
  }
}
