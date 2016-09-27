import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {GeoLocation} from './geolocation';

/**
 * This service provides geo location support.
 */
@Injectable()
export class GeoLocationService {

  /**
   * Geo location API url.
   */
  private geolocationUrl = 'http://ipinfo.io/json';

  /**
   * Create a new instance.
   *
   * @param http Http is required to fetch geo location information via API.
   */
  constructor(private http: Http) {
  }

  /**
   * Get the users geo location. Either based on device information (preferred) or via IP.
   *
   * @returns {any} the geolocation
   */
  getGeoLocation(): Promise<number[]> {
    let geoLocation = new ol.Geolocation({
      projection: 'EPSG:4326',
      tracking: false
    });

    if (geoLocation.getPosition()) {
      return new Promise(function () {
        return [geoLocation.getPosition()[0], geoLocation.getPosition()[1]];
      });
    } else {
      return this.http.get(this.geolocationUrl)
        .toPromise()
        .then(response => response.json() as GeoLocation)
        .then(location => location.loc.split(',').map(parseFloat))
        .catch(function (error: any) {
          return Promise.reject(error.message || error);
        });
    }
  }
}
