import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, output, Output } from '@angular/core';
import { RATES } from './rates';
import { BehaviorSubject, interval, map, startWith, switchMap, takeUntil } from 'rxjs';
import { outputFromObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyConverterComponent {

  readonly manualRefresh$ = new BehaviorSubject<void>(undefined);

  readonly refreshRequired$ = this.manualRefresh$.pipe(
    switchMap(() => interval(5000).pipe(startWith(0))),
    map(() => { }),
    takeUntilDestroyed()
  );

  readonly refreshRequired = outputFromObservable(this.refreshRequired$);

  readonly amount = input.required<number>();
  readonly currency = input.required<string>();

  readonly rate = computed(() => RATES[this.currency()]);
  readonly converted = computed(() => this.amount() * this.rate());


  /*   onRefresh() {
      this.refreshRequired.emit();
    } */

  /*   readonly manualRefresh$ = new BehaviorSubject<void>(undefined);

    private readonly stop$ = new Subject<void>();
    stopRefresh() {
      this.stop$.next();
    }

    readonly refreshRequired$ = this.manualRefresh$.pipe(
      switchMap(() => interval(2000).pipe(startWith(0))),
      map(() => {}),
      takeUntilDestroyed(),
      takeUntil(this.stop$)
    );


    readonly refreshRequired = outputFromObservable(this.refreshRequired$);

    readonly amount = input.required<number>();
    readonly currency = input.required<string>();

    readonly rate = computed(() => RATES[this.currency()]);
    readonly converted = computed(() => this.amount() * this.rate()); */

}
