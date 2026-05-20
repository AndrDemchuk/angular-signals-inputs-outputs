import {
  Component,
  signal,
  AfterViewInit,
  viewChild,
  viewChildren,
  ViewContainerRef,
  OnInit,
  effect
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { RATES } from './components/currency-converter/rates';
import { OptionSelectorComponent } from './components/option-selector/option-selector.component';
import { OptionDirective } from './components/option-selector/option.directive';
import { RgbDirective } from './directives/rgb.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CurrencyConverterComponent,
    ReactiveFormsModule,
    OptionSelectorComponent,
    OptionDirective,
    RgbDirective
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnInit {
  currencyConverter = viewChild.required(CurrencyConverterComponent);
  currentConverters = viewChildren(CurrencyConverterComponent);
  myRefDiv = viewChild.required('myRef', { read: ViewContainerRef });

  stopRefresh() {
    this.currencyConverter().stopRefresh();
    for (const converter of this.currentConverters()) {
      converter.stopRefresh();
    }
  }

  constructor() {
    effect(() => {
      console.log('effect', this.currencyConverter());
    });
  }

  ngOnInit(): void {
    console.log('On Init');
  }


  ngAfterViewInit(): void {
    console.log('constructor, view child required signal value is', this.currencyConverter());
  }

  readonly currencies = Object.keys(RATES);

  readonly currency = signal('GBP');

  amount = new FormControl(100);

  refreshData() {
    console.log('refreshData');
  }
}
