import {Injectable} from '@angular/core';

import {Alert} from './alert';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

/**
 * Service for the {@link AlertComponent}.
 */
@Injectable()
export class AlertService {

  /**
   * The {@link Alert}s {@link Subject}.
   */
  private _alerts$: Subject<Alert[]>;

  /**
   * The {@link Alert}.
   */
  private alerts: Alert[];

  /**
   * Create a new instance.
   */
  constructor() {
    this._alerts$ = <Subject<Alert[]>>new Subject();
    this.alerts = [];
  }

  /**
   * Add an {@link Alert}.
   *
   * @param alert the {@link Alert}
   */
  public addAlert(alert: Alert): void {
    this.alerts.push(alert);
    this._alerts$.next(this.alerts);
  }

  /**
   * Remove an {@link Alert}.
   *
   * @param alert the {@link Alert}
   */
  public removeAlert(alert: Alert): void {
    let index = this.alerts.indexOf(alert);
    if (index >= 0) {
      this.alerts.splice(index, 1);
    }
    this._alerts$.next(this.alerts);
  }

  /**
   * Get the {@link Observable} {@link Alert}s.
   *
   * @returns {Alert[]} the {@link Observable} {@link Alert}s
   */
  getAlerts(): Observable<Alert[]> {
    return this._alerts$.asObservable();
  }
}
