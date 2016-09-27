import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Site} from './site';

@Injectable()
export class SiteService {
  private sitesUrl = 'http://opendata.dbbahnpark.info/api/beta/sites';

  constructor(private http: Http) {
  }

  getSites(): Promise<Site[]> {
    return this.http.get(this.sitesUrl)
      .toPromise()
      .then(response => response.json().results as Site[])
      .catch(error => Promise.reject(error.message || error));
  }
}
