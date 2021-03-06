import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CdDevice } from '../models/devices';
import { SmartDataResponseV1 } from '../models/smart';
import { DeviceService } from '../services/device.service';
import { ApiModule } from './api.module';

@Injectable({
  providedIn: ApiModule
})
export class HostService {
  baseURL = 'api/host';

  constructor(private http: HttpClient, private deviceService: DeviceService) {}

  list() {
    return this.http.get(this.baseURL);
  }

  add(hostname: string) {
    return this.http.post(this.baseURL, { hostname: hostname }, { observe: 'response' });
  }

  remove(hostname: string) {
    return this.http.delete(`${this.baseURL}/${hostname}`, { observe: 'response' });
  }

  getDevices(hostname: string): Observable<CdDevice[]> {
    return this.http
      .get<CdDevice[]>(`${this.baseURL}/${hostname}/devices`)
      .pipe(map((devices) => devices.map((device) => this.deviceService.prepareDevice(device))));
  }

  getSmartData(hostname: string) {
    return this.http.get<SmartDataResponseV1>(`${this.baseURL}/${hostname}/smart`);
  }
}
