import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Occupancy} from './occupancy';

/**
 * The {@link Occupancy} service.
 */
@Injectable()
export class OccupancyService {

  /**
   * The API base URL.
   */
  private occupancyUrl = 'http://opendata.dbbahnpark.info/api/beta/occupancy/';

  /**
   * Create a new instance.
   *
   * @param http the {@link Http}
   */
  constructor(private http: Http) {
  }

  /**
   * Get the {@link Occupancy} data for a given {@link Site}.
   *
   * @param id the {@link Site} id
   * @returns {Promise<Occupancy>} the {@link Occupancy} data for the given {@link Site}
   */
  getOccupancy(id: number): Promise<Occupancy> {
    return this.http.get(this.occupancyUrl + id)
      .toPromise()
      .then(response => response.json() as Occupancy)
      .catch(error => null); // No occupancy data: Ignore.
  }
}
