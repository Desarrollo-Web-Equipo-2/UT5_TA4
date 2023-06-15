import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
    }

    setToken(token: string){
        this.headers.set('Authorization', 'Bearer '+token);
    }

    login(email:string, password:string ) {
        return this.http.post<string>('http://localhost:3000/api/login', {email, password});
    }

    test() {
        return this.http.get('http://localhost:3000/test', {withCredentials: true, headers: this.headers});
    }
}
