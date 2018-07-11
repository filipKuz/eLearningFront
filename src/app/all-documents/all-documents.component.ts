import { Component, OnInit } from '@angular/core';
import { EdocumentService } from '../edocuments/edocument.service';

@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrls: ['./all-documents.component.css']
})
export class AllDocumentsComponent implements OnInit {

  id: number;
  private sub: any;
  documents:any = [];

  constructor(
    private edocService: EdocumentService) { }

  ngOnInit() {
    this.getDocumentsByUserId();
  }

  getDocumentsByUserId() {
    this.edocService.getAllDocuments().subscribe(
        (response: any) => [this.documents = response,
        this.documents.forEach(element => {
          this.getDocument(element.nuxeoId);
        })],
        error => console.log(error)
      );
  }  

  

  nuxeoResponse:any = [];

  getDocument(nuxeoId: string) {
    this.edocService.getNuxeoResourceById(nuxeoId)
      .subscribe(
        response => [this.nuxeoResponse.push(response), console.log(response)],
        error => console.log(error)
      )
  }

}
