import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsModel } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class SettingsService {
  constructor(private readonly _httpClient: HttpClient) {
  }

  getSettings(): Observable<SettingsModel> {
    return this._httpClient.get<SettingsModel>(`${ environment.apiUrl }/settings`);
  }
}
