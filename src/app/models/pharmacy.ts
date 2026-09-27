export interface PharmacyDuty {
    pharmacyId: number;
    dutyDate: string;
    dutyType: string | null;
    name: string | null;
    address: string | null;
    phone: string | null;
    area: string | null;
    latitude: number | null;
    longitude: number | null;
}

export interface NearbyPharmacy extends PharmacyDuty {
    latitude: number;
    longitude: number;
    distanceKm: number;
}