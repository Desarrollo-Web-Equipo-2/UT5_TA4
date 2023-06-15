import { Component } from '@angular/core';
import { AuthService } from "./auth-service.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'UT5-TA4';

    constructor(private auth: AuthService) {
    }

    prueba() {
        this.auth.test().subscribe({
            next: (res) => {
                alert(res);
            }
        })
    }
}
