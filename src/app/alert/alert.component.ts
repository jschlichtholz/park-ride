import {Component, OnInit} from '@angular/core';

import {AlertService} from './alert.service';
import {Alert} from './alert';

/**
 * Component to display {@link Alert}s.
 */
@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.sass']
})
export class AlertComponent implements OnInit {

  /**
   * The {@link Alert}s.
   */
  alerts: Alert[];

  /**
   * Create a new instance.
   *
   * @param alertService the {@link AlertService}
   */
  constructor(private alertService: AlertService) {
  }

  /**
   * Subscribe to the {@link Alert}s provided by the {@link AlertService}
   */
  ngOnInit(): void {
    this.alertService.getAlerts().subscribe(alerts => {
      this.alerts = alerts;
    });
  }

  /**
   * Dismiss a given {@link Alert}.
   *
   * @param alert the {@link Alert}
   */
  dismiss(alert: Alert): void {
    this.alertService.removeAlert(alert);
  }

  /**
   * Compute the position of a given {@link Alert}.
   *
   * @param alert the {@link Alert}
   * @returns {number} the position
   */
  getPosition(alert: Alert): number {
    return this.alerts.indexOf(alert);
  }
}
