import * as d3 from 'd3'
import { ILoader, StandardLoader } from './elements';

import { SodaFilmLocatioRepository } from './repositories/movie-location.repository'
import { IGroup } from './model'
import { NodeHierarchyElement, Node } from './elements'
import * as $ from "jquery";
export interface IVisualizerConfig {

    targetId?: string;
}


export class Visualizer {

    private _loader: ILoader; 
    private _svg: d3.Selection<any>;
    private _nodeHierarchy: NodeHierarchyElement;

    constructor(private config: IVisualizerConfig) {}
      
    get targetId() {
        if(this.config.targetId) {
            return this.config.targetId;
        } 
        return "visualizer";
    }

    get height () {
        console.log(window.innerHeight || document.body.clientHeight)
        return $("svg").height();//window.innerHeight || document.body.clientHeight;// this.config.height;
    }

    get width() {
        return $("svg").width();; //this.config.width;
    }

    /** 
     * Gets the center y-coordinate of the screen 
     * */
    private get cx(): number {
        return this.width / 2;
    }

    /** 
     * Gets the center y-coordinate of the screen 
     * */
    private get cy(): number {
        return this.height / 2;
    }


    /** 
     * Draws the board and initialised related components.
     * Draw is defined elsewhere as it ensures the class can be constructed prior to actually be shown.
     * draw() should be called before setData to show loading while data is being fetched
     * */
     draw() {
      
        let target = d3.select(this.targetId);

        this._svg = target.append("svg")
                  //  .attr("width",  target.size())
                  //  .attr("height", target.style("height"))
               //   .attr("preserveAspectRatio", "xMidYMin meet")
                  .attr("viewBox", `0 0 ${$(this.targetId).parent().width()} ${$(this.targetId).parent().height()}`)

        this._loader = new StandardLoader(this._svg);
        this.setIsLoading(true);

    
        const config = {
      
            minimumValue: 3
        }

        this._nodeHierarchy = new NodeHierarchyElement(this._svg, config);

    }

    /**
     * Sets data and shows it on the screen.
     *  @param {boolean} isLoading
     */
    setData(data: Array<IGroup>) {
        if(!this._nodeHierarchy) {
            // If the _nodeHierarchy is not created draw has not been called
            this.draw();
        }
      
 

        this.setIsLoading(false);
        this._nodeHierarchy.data = data;

    }

  
    /**
     * Set whether or not a loader should be shown.
     *  @param {boolean} isLoading
     */
    setIsLoading(isLoading: boolean){
        if(isLoading) {
            this._loader.startLoader();
        } else {
            this._loader.stopLoader();
        }
    }
}



export class Controller {

    private _visualizer: Visualizer
    private _repository: SodaFilmLocatioRepository;

    constructor() {
        this._repository = new SodaFilmLocatioRepository();
        this._visualizer = new Visualizer({ });
    }

    draw() {
        this._visualizer.draw();

        this._repository.getGroups({ query: "locations" }, {query: "title"})
//        this._repository.getGroups({ label: "title" }, {label: "locations"})
            .then((groups) => {
                  this._visualizer.setData(groups);
            });
      
    }
}