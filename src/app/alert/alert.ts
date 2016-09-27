/**
 * Instances of this classed are handled by the {@link AlertService} and displayed by the {@link AlertComponent}.
 */
export class Alert {

  /**
   * The {@link Type}.
   */
  private type: string;

  /**
   * The lead text.
   */
  private lead: string;

  /**
   * The message text.
   */
  private msg: string;

  /**
   * Create a new instance.
   *
   * @param type the {@link Type}
   * @param lead the lead text
   * @param msg the message text
   */
  constructor(type: Type, lead: string, msg: string) {
    this.lead = lead;
    this.msg = msg;

    switch (type) {
      case Type.DANGER:
        this.type = 'danger';
        break;
      case Type.INFO:
        this.type = 'info';
        break;
      case Type.SUCCESS:
        this.type = 'success';
        break;
      case Type.WARNING:
        this.type = 'warning';
        break;
      default:
        this.type = 'default';
        break;
    }
  }
}

/**
 * Types of {@link Alert}s.
 */
export enum Type {
  SUCCESS,
  INFO,
  WARNING,
  DANGER
}
