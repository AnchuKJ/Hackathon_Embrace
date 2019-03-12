
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxXml2jsonService } from 'ngx-xml2json';
@Injectable()
export class CommonService {

  private basePath = ''; 
  constructor(
    private http: HttpClient,
    private ngxXml2jsonService: NgxXml2jsonService) {
        
  }
 
  public currentUserData =null;
  async GetPostData(url, params){    
    let data = await this.http.post(url, params, {headers:{'Content-Type': 'application/json', 'Allow-Control-Allow-Origin': '*' }}).toPromise();
      return data;
  }
}
