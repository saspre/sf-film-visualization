import * as d3 from 'd3';
import * as $ from "jquery";

import { IVisualizerConfig } from '../visualizer-config'

/**
 * The base elements provide basic functionality for elements (also including the visualizer)
 */
export class BaseElement {

    constructor(protected _config) { }

    /**
     * Center of the board X
     */
    get cx(): number {
        return this.width / 2;
    }

    /**
    * Center of the board Y
    */
    get cy(): number {
        return this.height / 2;
    }

    /**
    * Width of the SVG
    */
    get width(): number {
        return +$(this.targetId).width()
    }

    /**
    * Height of the SVG
    */
    get height(): number {
        return +$(this.targetId).height()
    }

    /**
     * Returns the selector (targetId) for which element to attahc the SVG to.
     */
    get targetId(): string {
        if (this._config && this._config.targetId) {
            return this._config.targetId;
        }
        return ".visualizer";
    }
}
