import { EventEmitter, Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataServiceService {
  selectedTier: any;
  prim_color!: string;
  sec_color!: string;
  constructor() {}

  public selected_code = 0;
  private dataSubject: ReplaySubject<number> = new ReplaySubject<number>(1);

  setData(data: number): void {
    this.dataSubject.next(data);
  }

  getData(): Observable<number> {
    return this.dataSubject.asObservable();
  }

  colorPerPartner (_tier: any):Observable<any> {
    var colors = ['Red', 'Blue', 'Green', 'Purple', 'Orange', 'Yellow']
    this.selectedTier = _tier

    switch (_tier) {
      case 'Tier 1':
        this.prim_color = colors[0]
        this.sec_color = colors[1]
        break

      case 'Tier 2':
        ;(this.prim_color = colors[2]), (this.sec_color = colors[0])
        break

      case 'Tier 3':
        this.prim_color = colors[1]
        this.sec_color = colors[3]
        break

      case 'Tier 4':
        this.prim_color = colors[4]
        this.sec_color = colors[5]
        break

      default:
        break
    }

    return this.selectedTier
  }
}
