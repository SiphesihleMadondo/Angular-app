import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, map } from 'rxjs'


@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  // Access URL
  url: string = 'http://localhost:5226'
  error: any | null

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor (protected http: HttpClient) {}

  //return the response as object.
  // <> specify the type of response the get method is going to return i.e
  getData (): Observable<any> {
    return this.http.get<[]>(this.url + '/api/Project/getData')
  }

  getTransition (): Observable<any> {
    return this.http.get<[]>(this.url + '/api/Project/getTransition')
  }

  getPartner (): Observable<any> {
    return this.http.get<[]>(this.url + '/api/Project/getPartners')
  }

  getPerPartner (partner: number): Observable<any> {
    return this.http.get<[]>(
      this.url + `/api/Project/getPerPartner/${partner}`
    )
  }

  getGoalPerPartner (code: number): Observable<any> {
    return this.http.get(this.url + `/api/Project/setGoal/${code}`)
  }

  getLodgements (partner_code: number): Observable<any> {
    return this.http.get(this.url + `/api/Project/getLodgement/${partner_code}`)
  }
  
  getIntergrationStats(partner_code: number):Observable<any>{
      return this.http.get(this.url + `/api/Project/getIntergrationStats/${partner_code}`)
  }

  getCompliance(partner_code: number): Observable<any>{
    return this.http.get(this.url + `/api/Project/getCompliance/${partner_code}`)
  }

  signin(user: any): Observable<any> {
    return this.http.get<any>(this.url + `/api/Project/Checkuser/${user}`, this.httpOptions)
  }

  returnClients() {
    return this.http.get<any>(this.url + '/api/Project/GetUser');
  }
}
