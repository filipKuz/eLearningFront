import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EdocumentService } from './edocument.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edocuments',
  templateUrl: './edocuments.component.html',
  styleUrls: ['./edocuments.component.css']
})
export class EdocumentsComponent implements OnInit {

  id: number;
  private sub: any;
  documents:any = [];
  file: File;

  constructor(private route: ActivatedRoute,
    private edocService: EdocumentService) { }

  ngOnInit() {
    this.getDocumentsByUserId();
  }

  getDocumentsByUserId() {
    this.nuxeoResponse = []
    this.sub = this.route.params.subscribe(params => {
    this.id = +params['id']; // (+) converts string 'id' to a number
    this.edocService.getDocumentsByUserId(this.id).subscribe(
        (response: any) => [this.documents = response,
        response.forEach(element => {
          console.log("novo  " + element.nuxeoId)
          this.getDocument(element.nuxeoId);
        })],
        error => console.log(error)
      );
    }); 
  }

  documentNuxeoId:string="";
  fileChange(event) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.file = files[0];
    this.edocService.uploadDocument(this.file, this.id).subscribe(
      response =>
        this.getDocumentsByUserId(),

      error => console.log(error)
    );
  }

  nuxeoResponse:any = [];

  getDocument(nuxeoId: string) {
    this.edocService.getNuxeoResourceById(nuxeoId)
      .subscribe(
        response => this.nuxeoResponse.push(response),
        error => console.log(error)
      )
  }

}
