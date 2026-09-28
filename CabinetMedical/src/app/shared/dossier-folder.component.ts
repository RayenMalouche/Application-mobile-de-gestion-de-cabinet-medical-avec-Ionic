// Ported from component-lab `folder.tsx` (21st.dev), React + motion → Angular.
// Kept: the back panel, three pages that fan out when the folder opens, and the
// front flap tipping back on rotateX. Changed: motion's springs are CSS
// transitions; it's the patient's manila "dossier médical", open whenever there
// are documents inside (or under the pointer), with the count on its label.
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-dossier-folder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="folder" [class.is-open]="count > 0" role="img" [attr.aria-label]="label + ', ' + count + ' document' + (count === 1 ? '' : 's')">
      <div class="folder__back"></div>
      <div class="folder__page p1"><i></i><i></i><i></i></div>
      <div class="folder__page p2"><i></i><i></i><i></i></div>
      <div class="folder__page p3"><i></i><i></i><i></i></div>
      <div class="folder__flap">
        <span class="folder__label">{{ label }}</span>
        <span class="folder__count">{{ count }} document{{ count === 1 ? '' : 's' }}</span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .folder {
        position: relative;
        width: 220px;
        height: 170px;
        margin: 64px auto 8px;
        perspective: 700px;
      }
      .folder__back {
        position: absolute;
        inset: 14px 12px 10px;
        border-radius: 10px 10px 8px 8px;
        background: #c9a66b;
      }
      .folder__back::before {
        content: '';
        position: absolute;
        top: -12px;
        left: 0;
        width: 74px;
        height: 16px;
        border-radius: 8px 8px 0 0;
        background: #c9a66b;
      }
      .folder__page {
        position: absolute;
        top: 22px;
        left: 50%;
        width: 92px;
        height: 118px;
        margin-left: -46px;
        padding: 12px 10px;
        border-radius: 6px;
        background: var(--cm-card);
        box-shadow: 0 2px 8px rgba(29, 43, 54, 0.2);
        transition: transform 0.5s cubic-bezier(0.3, 1.4, 0.5, 1);
      }
      .folder__page i {
        display: block;
        height: 4px;
        margin-bottom: 7px;
        border-radius: 2px;
        background: var(--cm-rule);
      }
      .folder__page i:first-child {
        width: 60%;
        background: var(--cm-teal);
      }
      .p1 {
        transform: rotate(-4deg) translate(-28px, 4px);
      }
      .p2 {
        z-index: 1;
      }
      .p3 {
        transform: rotate(4deg) translate(28px, 4px);
      }
      .is-open .p1,
      .folder:hover .p1 {
        transform: rotate(-14deg) translate(-64px, -54px);
      }
      .is-open .p2,
      .folder:hover .p2 {
        transform: translateY(-66px);
      }
      .is-open .p3,
      .folder:hover .p3 {
        transform: rotate(14deg) translate(64px, -54px);
      }
      .folder__flap {
        position: absolute;
        inset: auto 11px 9px;
        z-index: 2;
        height: 108px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        border-radius: 8px;
        background: #d6b77f;
        box-shadow: 0 6px 14px rgba(29, 43, 54, 0.25);
        transform-origin: bottom center;
        transition: transform 0.5s cubic-bezier(0.3, 1.3, 0.5, 1);
      }
      .is-open .folder__flap,
      .folder:hover .folder__flap {
        transform: rotateX(-32deg);
      }
      .folder__label {
        padding: 2px 10px;
        border-radius: 4px;
        background: var(--cm-card);
        font-family: var(--cm-font-mono);
        font-size: 0.68rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--cm-ink);
      }
      .folder__count {
        font-family: var(--cm-font-display);
        font-size: 1.1rem;
        font-weight: 600;
        color: #3d2e14;
      }
      @media (prefers-reduced-motion: reduce) {
        .folder__page,
        .folder__flap {
          transition: none;
        }
      }
    `,
  ],
})
export class DossierFolderComponent {
  @Input() count = 0;
  @Input() label = 'Dossier médical';
}
