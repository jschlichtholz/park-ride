import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {AlertComponent} from './alert/alert.component';
import {MapComponent} from './map/map.component';
import {SiteComponent} from './site/site.component';

import {L10nPipe} from './l10n/l10n.pipe';
import {FilterPipe} from './filter/filter.pipe';

import {AlertService} from './alert/alert.service';
import {GeoLocationService} from './map/geolocation.service';
import {L10nService} from './l10n/l10n.service';
import {SiteService} from './site/site.service';

import {MESSAGE_PROVIDERS} from './l10n/messages';
import {OccupancyService} from './site/occupancy.service';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    L10nPipe,
    FilterPipe,
    SiteComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AlertService, GeoLocationService, L10nService, MESSAGE_PROVIDERS, SiteService, OccupancyService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
