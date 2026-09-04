import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  amount = signal<number>(1);
  fromCurrency = signal<string>('USD');
  toCurrency = signal<string>('EUR');

  private rates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.5,
    JPY: 155.2
  };

  currencies = Object.keys(this.rates);

  convertedAmount = computed(() => {
    const amt = this.amount();
    const from = this.fromCurrency();
    const to = this.toCurrency();

    if (isNaN(amt) || amt <= 0) return 0;

    const amountInUSD = amt / this.rates[from];
    const finalAmount = amountInUSD * this.rates[to];

    return Number(finalAmount.toFixed(2));
  });
}