export type NotificationErrorProps = {
  message: string;
  context: string;
}

export default class Notification {
  private errors: NotificationErrorProps[] = [];
  private _hasErrors: boolean = false;

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  messages(context?: string): string {
    let message = "";
    this.errors.forEach((error => {
      if (error.context === context || !context) {
        message += `${error.context}: ${error.message},`;
      }
    }))
    return message;
  }
  hasErrors(): boolean {
    if (this.errors.length > 0) {
      this._hasErrors = true;
    }
    return this._hasErrors;
  }

  getErrors(): NotificationErrorProps[] {
    return this.errors;
  }
}