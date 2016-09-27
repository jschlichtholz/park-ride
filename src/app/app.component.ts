import {AfterViewInit, Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {AlertService} from './alert/alert.service';
import {L10nService} from './l10n/l10n.service';
import {Alert, Type} from './alert/alert';
import {Site} from './site/site';
import {SiteService} from './site/site.service';
import {Marker} from './map/marker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit, OnInit {
  public languages: any[];

  search: string;
  sites: Site[];
  selectedSite: Site;
  longitude: number;
  latitude: number;
  markers: Marker[];

  constructor(private alertService: AlertService,
              private siteService: SiteService,
              private changeDetectionRef: ChangeDetectorRef,
              private l10nService: L10nService) {

  }

  ngOnInit(): void {
    $('body').attr('style', 'background-color: #fff;');

    this.languages = [
      {display: 'Deutsch', value: 'de', icon: 'de'},
      {display: 'English', value: 'en', icon: 'gb'}
    ];

    this.l10nService.currentLanguage = 'de';

    let self = this;
    this.siteService.getSites().then(sites => {
      this.sites = sites;
      this.markers = [];

      sites.forEach(site => {
        let lat: number = parseFloat(site.parkraumGeoLatitude);
        let long: number = parseFloat(site.parkraumGeoLongitude);
        self.markers.push(new Marker(long, lat, site));
      });
    }).catch(error =>
      self.alertService.addAlert(new Alert(Type.DANGER, 'Fehler: ', 'API nicht erreichbar.'))
    );
  }

  /**
   * Add an information alert and trigger change detection to display it.
   */
  ngAfterViewInit(): void {
    this.alertService.addAlert(new Alert(Type.INFO, 'welcome.alert.lead', 'welcome.alert.text'));
    this.changeDetectionRef.detectChanges();
  }

  setSelectedSite(site: Site): void {
    // Unset site and fire change detection to notify components even when selecting the same site twice.
    this.search = "";
    this.selectedSite = null;
    this.changeDetectionRef.detectChanges();
    this.selectedSite = site;

    if (site.parkraumGeoLatitude && site.parkraumGeoLongitude) {
      this.latitude = parseFloat(site.parkraumGeoLatitude);
      this.longitude = parseFloat(site.parkraumGeoLongitude);
    }
  }

  setLanguage(language: string): void {
    this.l10nService.currentLanguage = language;
  }

  isCurrentLanguage(language: string): boolean {
    return this.l10nService.currentLanguage === language;
  }

  getName(site: Site): string {
    if (site.parkraumDisplayName) {
      return site.parkraumDisplayName;
    } else if (site.parkraumName) {
      return site.parkraumName;
    } else if (site.parkraumBahnhofName) {
      if (site.parkraumKennung) {
        return site.parkraumBahnhofName + ' (' + site.parkraumKennung + ')';
      }
    }

    return 'Unbekannter Parkplatz';
  }
}
