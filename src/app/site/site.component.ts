import {Component, Input, SimpleChange, OnChanges} from '@angular/core';
import {Site} from './site';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';
import {L10nService} from '../l10n/l10n.service';
import {OccupancyService} from './occupancy.service';
import {Occupancy} from './occupancy';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.sass']
})
export class SiteComponent implements OnChanges {
  @Input() site: Site;

  siteName: string;
  occupancy: Occupancy;
  image: SafeResourceUrl;

  constructor(private domSanitizer: DomSanitizer,
              private l10nService: L10nService,
              private occupancyService: OccupancyService) {
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void {
    let self = this;

    for (let property in changes) {
      if (property === 'site') {
        let displayName: string = this.site.parkraumDisplayName ? ' (' + this.site.parkraumDisplayName + ')' : '';
        this.site = changes[property].currentValue;
        this.siteName = this.site.parkraumBahnhofName + displayName
          || this.site.parkraumBahnhofName + ' (' + this.site.parkraumZufahrt + ')';

        // Download occupancy data.
        this.occupancyService.getOccupancy(parseInt(this.site.parkraumId, 10)).then(occupancy => {
          self.occupancy = occupancy;
        }).catch(() => {
          self.occupancy = null;
        });

        // Inject occupancy graph if available.
        this.injectImage(this.site.parkraumId);

        // Display modal.
        $('#myModal').modal();
      }
    }
  }

  close() {
    this.site = null;
  }

  getOutOfOrder(site: Site): string {
    if (this.l10nService.currentLanguage === 'de') {
      return site.parkraumAusserBetriebText;
    } else {
      return site.parkraumAusserBetrieb_en;
    }
  }

  getOpeningHours(site: Site): string {
    if (this.l10nService.currentLanguage === 'de') {
      return site.parkraumOeffnungszeiten;
    } else {
      return site.parkraumOeffnungszeiten_en;
    }
  }

  getAccess(site: Site): string {
    if (this.l10nService.currentLanguage === 'de') {
      return site.parkraumZufahrt;
    } else {
      return site.parkraumZufahrt_en;
    }
  }

  getTechnology(site: Site): string {
    if (this.l10nService.currentLanguage === 'de') {
      return site.parkraumTechnik;
    } else {
      return site.parkraumTechnik_en;
    }
  }

  getFreeTime(site: Site): string {
    if (this.l10nService.currentLanguage === 'de') {
      return site.tarifFreiparkzeit;
    } else {
      return site.tarifFreiparkzeit_en;
    }
  }

  getSpecialPricing(site: Site): string {
    if (this.l10nService.currentLanguage === 'de') {
      return site.tarifSondertarif;
    } else {
      return site.tarifSondertarif_en;
    }
  }


  getPaymentMeans(site: Site): string {
    if (this.l10nService.currentLanguage === 'de') {
      return site.zahlungMedien;
    } else {
      return site.zahlungMedien_en;
    }
  }

  getStyle(): String {
    if (this.occupancy) {
      switch (this.occupancy.allocation.category) {
        case 1:
          return 'tag tag-danger';
        case 2:
          return 'tag tag-warning';
        case 3:
          return 'tag tag-info';
        case 4:
          return 'tag tag-success';
      }
    }
  }

  getBooleanStyle(bool: boolean): String {
    return bool ? 'tag tag-success' : 'tag tag-danger';
  }

  private injectImage(siteId: string): void {
    let self = this;
    let url: string = '../assets/' + siteId + '.svg';
    let image: HTMLImageElement = new Image();
    image.onload = function () {
      self.image = self.domSanitizer.bypassSecurityTrustResourceUrl(url);
    };
    image.onerror = function () {
      self.image = null;
    };
    image.src = url;
  }
}
