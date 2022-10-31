import { Component, OnInit } from '@angular/core';
import { AppwriteService } from '../services/appwrite.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css']
})
export class PodcastComponent implements OnInit {

  videoId?: string;
  rssUrl?: string;

  inLoading = false;
  thereIsInfo =false;

  title?: string;
  image?: string;
  numberEp?: string;
  episodes?: any = [];
  selectedEpisode?: any;
  transcriptText?: string ="";

  constructor(private appwriteService: AppwriteService) { }

  ngOnInit(): void {
  }
  getInfoPodcast(): void {
    //CHECK IF LINK IS CORRECTED

    this.appwriteService.GetInfoPodcast(this.rssUrl!).then((response: any) => {
      console.log(response); // Success
      this.title = JSON.parse(response.response).title;
      this.image = JSON.parse(response.response).image;
      this.numberEp = JSON.parse(response.response).numberEp;
      this.episodes = JSON.parse(response.response).arrayList;
      
      this.thereIsInfo=true;
    }, (error: any) => {

      console.log(error); // Failure

    });
  }
  transcript(): void {
    //CHECK IF LINK IS CORRECTED

    this.inLoading = true;
    this.appwriteService.transcriptPodcast(this.selectedEpisode.link!).then((response: any) => {
      console.log(response); // Success
      //this.transcriptText = JSON.parse(response.response).title;
      this.transcriptText= JSON.parse(response.response).deepgramResponse.results.channels[0].alternatives[0].transcript;
      this.inLoading = false;
    }, (error: any) => {
      this.inLoading = false;

      console.log(error); // Failure

    });
  }
}
