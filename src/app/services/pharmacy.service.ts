import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URL } from '../config/api.config';
import { PharmacyDuty, NearbyPharmacy } from '../models/pharmacy';

@Injectable({
    providedIn: 'root'
})
export class PharmacyService {

    private readonly http = inject(HttpClient);

    getToday(
        area?: string,
        dutyType?: number
    ): Observable<PharmacyDuty[]> {

        let params = new HttpParams();

        if (area) {
            params = params.set('area', area);
        }

        if (dutyType !== undefined) {
            params = params.set('dutyType', dutyType);
        }

        return this.http.get<PharmacyDuty[]>(
            `${API_URL}/api/pharmacies/duties/today`,
            { params }
        );
    }

    getDuties(
        date?: string,
        area?: string,
        dutyType?: number
    ): Observable<PharmacyDuty[]> {

        let params = new HttpParams();

        if (date) {
            params = params.set('date', date);
        }

        if (area) {
            params = params.set('area', area);
        }

        if (dutyType !== undefined) {
            params = params.set('dutyType', dutyType);
        }

        return this.http.get<PharmacyDuty[]>(
            `${API_URL}/api/pharmacies/duties`,
            { params }
        );
    }

    getNearby(
        latitude: number,
        longitude: number,
        radius: number = 5,
        dutyType?: number
    ): Observable<NearbyPharmacy[]> {

        let params = new HttpParams()
            .set('latitude', latitude)
            .set('longitude', longitude)
            .set('radius', radius);

        if (dutyType !== undefined) {
            params = params.set('dutyType', dutyType);
        }

        return this.http.get<NearbyPharmacy[]>(
            `${API_URL}/api/pharmacies/nearby`,
            { params }
        );
    }
}