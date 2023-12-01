import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {

  // profile image
  loadFile(event: Event): void {
    const target = event.target as HTMLInputElement;
    const image = document.getElementById('output') as HTMLImageElement;

    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      image.src = URL.createObjectURL(target.files[0]);

      this.saveFileLocally(file);
    }
  }
  // profile image save try
  saveFileLocally(file: File): void {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64Data = (event.target as any).result;
      const fileName = file.name;

      // Save the base64 data to local storage
      localStorage.setItem(fileName, base64Data);

      console.log('File saved locally:', fileName);
    };

    // Read the file as data URL
    reader.readAsDataURL(file);
  }

  

}
