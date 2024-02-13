import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.less'],
})
export class CreatePostComponent {
  selectedImageFile!: File;
  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files![0];
    if (!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener('loadend', (ev) => {
      let readableString = fileReader.result!.toString();
      let postPreviewImage = <HTMLInputElement>(
        document.getElementById('post-preview-image')
      );
      postPreviewImage.src = readableString;
    });
  }
}
