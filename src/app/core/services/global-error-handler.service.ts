import { ErrorHandler, Injectable } from '@angular/core';
//import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}
  handleError(error: Error): void {
    const message = error.message || 'Ein unerwarteter Fehler ist aufgetreten.';
    this.snackBar.open(message, 'Schliessen', {
      duration: 5000,
    });

    console.error('GlobalErrorHandler:', error);
  }

  /*
  Nicht mein Backend deshalb weggelassen

  postCustomData(error: Error, message: string): void {
    const req = new XMLHttpRequest();
    req.open('POST', `${environment.serviceUrl}/api/report-error/client-fatal`);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(
      JSON.stringify({
        "client-message": message || '',
        "client-error": error.stack || '',
      })
    );
  }
    */
}
