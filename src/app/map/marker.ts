/**
 * Markers are displayed on the map. The payload is forwarded when the marker is selected.
 */
export class Marker {
  longitude: number;
  latitude: number;
  payload: any;

  constructor(longitude: number, latitude: number, payload: any) {
    this.longitude = longitude;
    this.latitude = latitude;
    this.payload = payload;
  }
}
