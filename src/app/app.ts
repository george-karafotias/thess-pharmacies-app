import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PharmacyService } from './services/pharmacy.service';
import { PharmacyDuty } from './models/pharmacy';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private readonly pharmacyService = inject(PharmacyService);
  private readonly cdr = inject(ChangeDetectorRef);

  pharmacies: PharmacyDuty[] = [];
  areas: string[] = [];

  selectedDate = this.getToday();
  selectedArea = '';

  loading = false;
  error: string | null = null;

  constructor() {
    this.loadPharmacies();
  }

  private getToday(): string {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  loadPharmacies(): void {
    this.loading = true;
    this.error = null;

    this.pharmacyService
      .getDuties(
        this.selectedDate,
        this.selectedArea || undefined
      )
      .subscribe({
        next: pharmacies => {
          this.pharmacies = pharmacies;

          // Build the area list from the returned pharmacies.
          const areaSet = new Set(
            pharmacies
              .map(pharmacy => pharmacy.area)
              .filter((area): area is string => !!area)
          );

          this.areas = Array.from(areaSet).sort((a, b) =>
            a.localeCompare(b, 'el')
          );

          this.loading = false;

          this.cdr.detectChanges();

          console.log('Pharmacies:', pharmacies);
          console.log('Areas:', this.areas);
        },

        error: error => {
          console.error('Failed to load pharmacies:', error);

          this.pharmacies = [];
          this.error = 'Unable to load pharmacies.';
          this.loading = false;

          this.cdr.detectChanges();
        }
      });
  }

  onDateChange(): void {
    this.selectedArea = '';
    this.loadPharmacies();
  }

  onAreaChange(): void {
    this.loadPharmacies();
  }
}