import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges } from '@angular/core';

@Component({
    selector: 'app-details-table',
    templateUrl: 'details-table.component.html',
    styleUrls: ['details-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DetailsTableComponent implements OnChanges {
    @Input() rows: any[];
    @Output('onLeave') onLeave = new EventEmitter();

    keys: string[];

    constructor(private changeRef: ChangeDetectorRef) {}

    ngOnChanges() {
        this.getHeaders();
        if (this.rows) {
            document.body.style.overflow = 'auto';
        }
        this.changeRef.detectChanges();
    }

    leave() {
        document.body.style.overflow = 'hidden';
        this.onLeave.emit();
    }

    private getHeaders() {
        this.keys = Object.keys(this.rows[0]);
    }
}
