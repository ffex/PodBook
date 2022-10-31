import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppwriteService } from './services/appwrite.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pod-book';


  items: MenuItem[] = [];
  constructor(private appwriteService: AppwriteService) {
    appwriteService.setupSDK();

}
  ngOnInit() {

    this.items = [
      {
        label: "Home",
        icon: "pi pi-home",
        routerLink: ["home"]
      },
      {
        label: "Video",
        icon: "pi pi-video",
        routerLink: ["video"],
        disabled: true
      },
      {
        label: "Podcast",
        icon: "pi pi-megaphone",
        routerLink: ["podcast"],
      },
      {
        label: "About",
        routerLink: ["about"]

      }
    ];
  }
}
