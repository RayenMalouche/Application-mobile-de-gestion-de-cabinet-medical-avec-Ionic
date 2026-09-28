// The signature element: the appointment card a patient is handed at reception.
// A stub on the left carries the date in large type; a perforation separates it
// from the body (who, when, why) and its rubber stamp. Anything projected into
// the card appears on a tear-off strip underneath — the page's actions.
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

import { rdvStatus } from './rdv-status';

const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const DAYS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

@Component({
  selector: 'app-rdv-card',
  standalone: true,
  imports: [NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="rdv" [class.rdv--compact]="compact">
      <div class="rdv__main">
        <div class="rdv__stub" aria-hidden="true">
          <ng-container *ngIf="parsed; else rawDate">
            <span class="rdv__wd">{{ parsed.weekday }}</span>
            <span class="rdv__day">{{ parsed.day }}</span>
            <span class="rdv__month">{{ parsed.month }}</span>
          </ng-container>
          <ng-template #rawDate><span class="rdv__raw">{{ date || '—' }}</span></ng-template>
        </div>

        <div class="rdv__body">
          <span class="cm-kicker">{{ kicker }}</span>
          <h3 class="rdv__title">{{ title || 'Rendez-vous' }}</h3>
          <p class="rdv__sub" *ngIf="subtitle">{{ subtitle }}</p>
          <p class="rdv__when">
            <span class="sr-only">Le {{ date }}</span>
            <strong>{{ time || '—' }}</strong>
            <span *ngIf="note"> · {{ note }}</span>
          </p>
          <span class="cm-stamp rdv__stamp" [class.is-ok]="stamp.tone === 'ok'" [class.is-wait]="stamp.tone === 'wait'" [class.is-no]="stamp.tone === 'no'">
            {{ stamp.label }}
          </span>
        </div>
      </div>

      <div class="rdv__tear">
        <ng-content></ng-content>
      </div>
    </article>
  `,
  styles: [
    `
      :host {
        display: block;
        margin: 12px 16px;
      }
      .rdv {
        position: relative;
        overflow: hidden;
        border: 1px solid var(--cm-rule);
        border-radius: 12px;
        background: var(--cm-card);
      }
      .rdv__main {
        display: grid;
        grid-template-columns: 5.25rem 1fr;
      }
      .rdv__stub {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 14px 6px;
        background: var(--cm-mint);
        border-right: 2px dashed var(--cm-rule);
        text-align: center;
      }
      /* Punched notches where the stub tears off */
      .rdv__stub::before,
      .rdv__stub::after {
        content: '';
        position: absolute;
        right: -9px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--cm-paper);
        border: 1px solid var(--cm-rule);
      }
      .rdv__stub::before {
        top: -9px;
      }
      .rdv__stub::after {
        bottom: -9px;
      }
      .rdv__wd,
      .rdv__month {
        font-family: var(--cm-font-mono);
        font-size: 0.72rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--cm-teal);
      }
      .rdv__day {
        font-family: var(--cm-font-display);
        font-size: 2.3rem;
        font-weight: 600;
        line-height: 1;
        color: var(--cm-ink);
      }
      .rdv__raw {
        font-family: var(--cm-font-mono);
        font-size: 0.8rem;
        overflow-wrap: anywhere;
      }
      .rdv__body {
        position: relative;
        min-width: 0;
        padding: 14px 16px 14px 18px;
      }
      .rdv__title {
        margin: 2px 0 0;
        font-size: 1.15rem;
        line-height: 1.25;
        overflow-wrap: anywhere;
      }
      .rdv__sub {
        margin: 2px 0 0;
        color: var(--cm-muted);
        font-size: 0.92rem;
      }
      .rdv__when {
        margin: 8px 0 0;
        padding-right: 7rem;
        min-height: 1.9rem;
        display: flex;
        align-items: center;
        font-family: var(--cm-font-mono);
        font-size: 0.9rem;
      }
      .rdv__stamp {
        position: absolute;
        bottom: 12px;
        right: 12px;
      }
      .rdv__tear:empty {
        display: none;
      }
      .rdv__tear {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 12px;
        border-top: 2px dashed var(--cm-rule);
      }
      .rdv--compact .rdv__day {
        font-size: 1.9rem;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
      }
    `,
  ],
})
export class RdvCardComponent {
  /** The appointment date as the API sends it (YYYY-MM-DD or anything Date can parse). */
  @Input() date: string | null | undefined;
  @Input() time: string | null | undefined;
  @Input() title: string | null | undefined;
  @Input() subtitle: string | null | undefined;
  @Input() note: string | null | undefined;
  @Input() status: string | null | undefined;
  @Input() kicker = 'Carte de rendez-vous';
  @Input() compact = false;

  get stamp() {
    return rdvStatus(this.status);
  }

  get parsed(): { day: string; month: string; weekday: string } | null {
    if (!this.date) return null;
    // Parse YYYY-MM-DD as a local date, not UTC midnight.
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(this.date);
    const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(this.date);
    if (isNaN(d.getTime())) return null;
    return { day: String(d.getDate()), month: MONTHS[d.getMonth()], weekday: DAYS[d.getDay()] };
  }
}
