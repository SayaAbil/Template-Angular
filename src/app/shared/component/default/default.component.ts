import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-default',
  standalone:true,
  imports:[
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DefaultComponent {
test: boolean = false;
}

