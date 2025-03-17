import { Component, TemplateRef } from '@angular/core'
import { ToastService } from 'src/app/modules/toasts/toast.service'

@Component({
	selector: 'app-toasts',
	template: `
		<ngb-toast
			*ngFor="let toast of toastService.toasts"
			[class]="toast.classname"
			[autohide]="true"
			[delay]="toast.delay || 5000"
			(hidden)="toastService.remove(toast)">

			<ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
				<ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
			</ng-template>

			<ng-template #text>{{ toast.textOrTpl }}</ng-template>
		</ngb-toast>
	`,
	host: { class: 'toast-container position-fixed top-0 end-0 p-4', style: 'z-index: 1200; position: fixed; top: 0!important; right: 0!important; left: auto!important; margin: 0.5em;' }
})
export class ToastComponent {
	constructor(public toastService: ToastService) { }

	isTemplate(toast) {
		return toast.textOrTpl instanceof TemplateRef;
	}
}