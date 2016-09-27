import {Component, OnChanges, SimpleChange, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {GeoLocationService} from './geolocation.service';
import {Marker} from './marker';
import {AlertService} from '../alert/alert.service';
import {Alert, Type} from '../alert/alert';

/**
 * The default zoom.
 */
const DEFAULT_ZOOM = 15;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnChanges, OnInit {
  @Input() longitude: number;
  @Input() latitude: number;
  @Input() markers: Marker[];

  @Output() onSelect: EventEmitter<any>;

  private features: ol.Feature[] = [];
  private map: ol.Map;

  /**
   * Transform a {@link Coordinate} from geographic 2D to pseudo mercator. For details see
   * https://en.wikipedia.org/wiki/Spatial_reference_system .
   *
   * @param coordinate the {@link Coordinate}
   * @returns {Coordinate} the transformed {@link Coordinate}
   */
  private static transform(coordinate: ol.Coordinate): ol.Coordinate {
    let from: ol.proj.ProjectionLike = <ol.proj.ProjectionLike>'EPSG:4326';
    let to: ol.proj.ProjectionLike = <ol.proj.ProjectionLike>'EPSG:3857';
    return ol.proj.transform(coordinate, from, to);
  }

  constructor(private alertService: AlertService, private geoLocationService: GeoLocationService) {
    this.onSelect = new EventEmitter();
  }

  ngOnInit(): void {
    let self = this;
    this.geoLocationService.getGeoLocation().then(geoLocation => {
      this.longitude = geoLocation[1];
      this.latitude = geoLocation[0];
      self.initializeMap();
    }).catch(function () {
      let alert: Alert = new Alert(Type.WARNING, 'alert.warning', 'alert.warning.text');
      self.alertService.addAlert(alert);

      this.longitude = 0;
      this.latitude = 0;
    });
  }

  private initializeMap(): void {
    let self = this;

    let geolocation = new ol.Geolocation({
      projection: 'EPSG:4326',
      tracking: true
    });

    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: MapComponent.transform([self.longitude, self.latitude]),
        zoom: DEFAULT_ZOOM
      }),
    });

    let select = new ol.interaction.Select({
      condition: ol.events.condition.click,
      multi: false,
      style: self.generateStyle(true)
    });

    select.on('select', function (e) {
      if (self.onSelect && e['selected'] && e['selected'].length > 0) {
        self.onSelect.emit(e['selected'][0].U.payload);
      }

      // Deselect feature immediately.
      select.getFeatures().clear();
    });

    this.map.addInteraction(select);

    geolocation.on('change', function () {
      self.map.getView().setCenter(MapComponent.transform(geolocation.getPosition()));
    });
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void {
    let self = this;
    for (let property in changes) {
      if (!changes.hasOwnProperty(property)) {
        continue;
      }

      if (property === 'latitude' || property === 'longitude') {
        if (property === 'longitude') {
          this.longitude = changes[property].currentValue;
        }

        if (property === 'latitude') {
          this.latitude = changes[property].currentValue;
        }

        if (this.map) {
          this.map.getView().setCenter(MapComponent.transform([this.longitude, this.latitude]));
          this.map.getView().setZoom(DEFAULT_ZOOM);
        }
      }

      if (property === 'markers' && this.markers) {
        this.markers.forEach(marker => {
          let feature = new ol.Feature({
            geometry: new ol.geom.Point(MapComponent.transform([marker.longitude, marker.latitude])),
            payload: marker.payload
          });

          this.features.push(feature);
        });

        let vectorSource = new ol.source.Vector({
          features: this.features
        });

        this.map.addLayer(new ol.layer.Vector({
          source: vectorSource,
          style: self.generateStyle(false)
        }));
      }
    }
  }

  /**
   * Generate a {@link ol.Feature} {@link ol.style.Style}.
   *
   * @param selected if the {@link ol.Feature} is selected
   * @returns {ol.style.Style} the generated {@link ol.style.Style}
   */
  private generateStyle(selected: boolean): ol.style.Style {
    let self = this;
    let color: ol.Color = selected ? [231, 76, 60, 1] : [52, 152, 291, 1];
    let radius = self.map.getView().getZoom() / 2 + 1;

    return new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        fill: new ol.style.Fill({color: color}),
        stroke: new ol.style.Stroke(<olx.style.StrokeOptions>{color: 'white', width: 3})
      })
    });
  }
}
