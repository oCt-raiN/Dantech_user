import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  loadFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const image = document.getElementById('output') as HTMLImageElement;

    if (target?.files && target.files[0]) {
      image.src = URL.createObjectURL(target.files[0]);
      console.log(image.src);
    }
  };
}
