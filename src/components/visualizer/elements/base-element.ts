import * as d3 from 'd3';
import * as $ from "jquery";

import { IVisualizerConfig } from '../visualizer-config'

export class BaseElement {

   constructor (protected _config) { }

    get cx(): number {
        return this.width / 2;
    }

    get cy(): number {
        return this.height / 2;
    }

    get width(): number {
        return +$(this.targetId).width()
    }

    get height(): number  {
        return +$(this.targetId).height()
    }
 
     get targetId() {
        if (this._config && this._config.targetId) {
            return this._config.targetId;
        }
        return ".visualizer";
    }
}
