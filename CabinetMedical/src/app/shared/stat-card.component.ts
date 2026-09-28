// Ported from component-lab `stats-card.tsx` (21st.dev ActivityStatsCard),
// React + motion → Angular. Kept: the title, the large main value, a line of
// context under it, and a row of bars that grow in on load. Changed: framer's
// staggered springs are a CSS transition with a per-bar delay; each bar carries
// its value and a stamp-coloured tone; the card sits on the practice's paper.
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

export interface StatBar {
  label: string;
  value: number;
  tone?: 'ok' | 'wait' | 'no';
}

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="stat">
      <span class="cm-kicker">{{ title }}</span>
      <p class="stat__main">{{ mainValue }}</p>
      <p class="stat__sub" *ngIf="caption">{{ caption }}</p>
      <div class="stat__bars" *ngIf="bars.length">
        <div class="stat__bar" *ngFor="let bar of bars; let i = index">
          <span class="stat__value">{{ bar.value }}</span>
          <span class="stat__track">
            <span
              class="stat__fill"
              [class.is-ok]="bar.tone === 'ok'"
              [class.is-wait]="bar.tone === 'wait'"
              [class.is-no]="bar.tone === 'no'"
              [style.height.%]="grown ? pct(bar.value) : 0"
              [style.transition-delay.ms]="i * 90"
            ></span>
          </span>
          <span class="stat__label">{{ bar.label }}</span>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .stat {
        margin: 12px 16px;
        padding: 16px;
        border: 1px solid var(--cm-rule);
        border-radius: 12px;
        background: var(--cm-card);
      }
      .stat__main {
        margin: 4px 0 0;
        font-family: var(--cm-font-display);
        font-size: 2.6rem;
        font-weight: 600;
        line-height: 1;
      }
      .stat__sub {
        margin: 6px 0 0;
        color: var(--cm-muted);
      }
      .stat__bars {
        display: flex;
        align-items: flex-end;
        gap: 12px;
        height: 150px;
        margin-top: 16px;
      }
      .stat__bar {
        flex: 1;
        min-width: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
      }
      .stat__value {
        font-family: var(--cm-font-mono);
        font-size: 0.85rem;
        font-weight: 700;
      }
      .stat__track {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: flex-end;
        border-bottom: 2px solid var(--cm-ink);
      }
      .stat__fill {
        width: 100%;
        border-radius: 6px 6px 0 0;
        background: var(--cm-ink);
        transition: height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
      }
      .stat__fill.is-ok {
        background: var(--cm-teal);
      }
      .stat__fill.is-wait {
        background: var(--cm-iodine);
      }
      .stat__fill.is-no {
        background: var(--cm-stamp);
      }
      .stat__label {
        font-size: 0.8rem;
        color: var(--cm-muted);
        text-align: center;
      }
      @media (prefers-reduced-motion: reduce) {
        .stat__fill {
          transition: none;
        }
      }
    `,
  ],
})
export class StatCardComponent implements AfterViewInit {
  @Input() title = '';
  @Input() mainValue: string | number = '';
  @Input() caption = '';
  @Input() bars: StatBar[] = [];
  grown = false;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // Grow the bars in on the next frame so the transition runs.
    requestAnimationFrame(() => {
      this.grown = true;
      this.cdr.markForCheck();
    });
  }

  pct(value: number): number {
    const max = Math.max(1, ...this.bars.map((b) => b.value || 0));
    return Math.max(2, ((value || 0) / max) * 100);
  }
}
