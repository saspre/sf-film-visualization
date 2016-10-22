import * as d3 from 'd3'
import { ILoader, StandardLoader } from './elements';

import { SodaFilmLocatioRepository } from './repositories/movie-location.repository'
import { IGroup } from './model'
import { NodeHierarchyElement, Node } from './elements'

export interface IVisualizerConfig {
    height: number;
    width: number; 
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
        return window.innerHeight || document.body.clientHeight;// this.config.height;
    }

    get width() {
        return window.innerWidth || document.body.clientWidth; //this.config.width;
    }

    get cx(): number {
        return this.width / 2;
    }

    get cy(): number {
        return this.height / 2;
    }

   

    /** 
     * Draws the board and initialised related components.
     * Draw is defined elsewhere as it ensures the class can be constructed prior.
     * The downside to not having initization done in the constructor is that we rely on the caller to call to draw. 
     *  */
    public draw() {
      
   
      this._svg = d3.select(this.targetId).append("svg")
                .attr("width",  this.width)
                .attr("height", this.height)
              //  .attr("preserveAspectRatio", "xMinYMin meet")
              //  .attr("viewBox", "0 0 600 400")

      this._loader = new StandardLoader(this._svg);
      this.setIsLoading(true);

     const pack = d3.layout.pack()
            .sort((a: any, b: any) => a["name"] - b["name"])
            .size([this.width, this.height])
            .padding(5);

      this._nodeHierarchy = new NodeHierarchyElement(this._svg, pack);

    }

    setData(data: Array<IGroup>) {
        var diameter = 960
 
        data = data.filter((d) => d.value > 2)
      
        this.setIsLoading(false);
        this._nodeHierarchy.setData(data);

    }

  

    public setIsLoading(isLoading: boolean){
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
        this._visualizer = new Visualizer({ width: 800, height: 400 });
    }

    draw() {
        this._visualizer.draw();

        this._repository.getGroups({ label: "locations" }, {label: "title"})
//        this._repository.getGroups({ label: "title" }, {label: "locations"})
            .then((groups) => {
                  this._visualizer.setData(groups);
            });
      
    }
}