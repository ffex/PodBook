import { Injectable } from '@angular/core';
import { Client, Account, ID, Functions } from 'appwrite';


@Injectable({
    providedIn: 'root',
})
export class AppwriteService {
    client: Client = new Client();
    functions: Functions = new Functions(this.client);

    GETINFO_FUNCTION_ID = "635f9c8687bb8a6ce0c1";
    TRANSCRIPT_FUNCTION_ID = "635ff5ce124350091dc7";
    APPWRITE_PROJECT_ID = "63590f0f0d50b6613f0a";
    APPWRITE_ENDPOINT = "http://192.168.1.11/v1";

    setupSDK(): void {
        this.client
            .setEndpoint(this.APPWRITE_ENDPOINT) // Your API Endpoint
            .setProject(this.APPWRITE_PROJECT_ID);               // Your project ID
    }

    GetInfoPodcast(url: string): any {
        //this.setupSDK();
        const req = { rssUrl: url }
        const promise = this.functions.createExecution(this.GETINFO_FUNCTION_ID,JSON.stringify(req));

        return promise;
    }
    transcriptPodcast(url: string): any {
        //this.setupSDK();
        const req = { audioUrl: url }
        const promise = this.functions.createExecution(this.TRANSCRIPT_FUNCTION_ID,JSON.stringify(req));

        return promise;
    }

}