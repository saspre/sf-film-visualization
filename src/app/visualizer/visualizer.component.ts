import { Component, OnInit, ElementRef, ViewEncapsulation, HostListener, HostBinding } from '@angular/core';
import { MovieLocationService } from 'services';
import { SelectorStore } from 'store';
import { Observable,  } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NodeHierarchyElement, DataPoint } from './';
import * as d3 from 'd3';

@Component({
    selector: 'app-visualizer',
    templateUrl: './visualizer.component.html',
    styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

    @HostBinding('class') classList: string;

    isFullscreen = false;
    details: any[] = [];

    private _svg: d3.Selection<any>;
    private _nodeHierarchy: NodeHierarchyElement;
    private _resized = new Subject();

    constructor(
        private service: MovieLocationService,
        private selectorStore: SelectorStore,
        private element: ElementRef
    ) { }

    ngOnInit() {
        this.createNodeHiearchy();
        this.subSubscribeToGroupData();
        this.subScribeToDetailsData();
        this.createResizeHandler();
    }

    private createNodeHiearchy() {
        this._nodeHierarchy = new NodeHierarchyElement(this.element.nativeElement,
            {
                minimumValue: 2,
                callback: this.nodeClickedCallback
            });
    }

    private subSubscribeToGroupData() {
        this.service.groups$.subscribe((groups) => {
            this._nodeHierarchy.data = groups as DataPoint[];
            this.redraw();
        });
    }

    private subScribeToDetailsData() {
        this.service.details$.subscribe((details) => {
            this.details = details as any[];
            this._nodeHierarchy.hide();
        });
    }

    private nodeClickedCallback = (event) => {
        this.selectorStore.setTertiarySelector(event.name);
    }

    private onDetailsExited() {
        this.details = [];
        this.selectorStore.setTertiarySelector('');
    }

    private createResizeHandler() {
        this._resized
            .debounceTime(200)
            .subscribe(() => {
                this.redraw(false);
            });
    }

    private fullscreenClicked() {
        this.classList = 'fullscreen';
        this.isFullscreen = true;
        this.redraw(false);
    }

    private exitFullscreenClicked() {
        this.classList = '';
        this.isFullscreen = false;
        this.redraw(false);
    }

    private getDimensions() {
        const width = window.innerWidth - this.element.nativeElement.getBoundingClientRect().left;
        const height = window.innerHeight - this.element.nativeElement.getBoundingClientRect().top;
        return { height, width };
    }

    private redraw(animateIn = true) {
        if (!this.details || this.details.length === 0) {
            // A timeout is used because we need to ensure the dom has changed
            // before we attempt to find the dimensions.
            setTimeout(() => {
                const dimensions = this.getDimensions();
                this._nodeHierarchy.setDimensions(dimensions);
                this._nodeHierarchy.redraw(animateIn);
            }, 10);
        }
    }


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this._resized.next();
    }
}

