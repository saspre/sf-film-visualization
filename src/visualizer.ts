import * as d3 from 'd3'
import * as $ from "jquery";
import { ILoader, StandardLoader,NodeHierarchyElement, Node } from './elements';
import { SodaFilmLocatioRepository } from './repositories'
import { IGroup, ISelector, ISelectorManager } from './model'




export interface IVisualizerConfig {

    targetId?: string;
}


export class Visualizer {

    private _repository: SodaFilmLocatioRepository;
    private _loader: ILoader; 
    private _svg: d3.Selection<any>;
    private _nodeHierarchy: NodeHierarchyElement;

     constructor(private _manager: ISelectorManager, private config?: IVisualizerConfig) {
        this._repository = new SodaFilmLocatioRepository();
      
    }

    private onSelectorChanged = (primary: ISelector, secondary: ISelector ) => {
        if(this._nodeHierarchy) {
            this._nodeHierarchy.clean();
        }
        this.setIsLoading(true);
        this._repository.getGroups(primary, secondary)
           
            .then((groups) => {
                  this.setData(groups);
            });
    }

  
    get targetId() {
        if(this.config && this.config.targetId) {
            return this.config.targetId;
        } 
        return ".visualizer";
    }

    
    /** 
     * Draws the board and initialised related components.
     * Draw is defined elsewhere as it ensures the class can be constructed prior to actually be shown.
     * draw() should be called before setData to show loading while data is being fetched
     * */
     draw() {
      
        this._repository.getSelectors().then((selectors) => {
             this._manager.setPrimarySelectors(selectors, startPrimaryLabel);
             this._manager.setSecondarySelectors(selectors, startSecondaryLabel);
        })

       
       
        let target = d3.select(this.targetId);

        this._svg = target.append("svg")
              .attr("viewBox", `0 0 ${$(this.targetId).width()} ${$(this.targetId).height()}`)

        this._loader = new StandardLoader(this._svg);
        this.setIsLoading(true);

    
        const config = {
            minimumValue: 3
        }

         // Bootstrap with default data
        this.onSelectorChanged({ query: startSecondaryLabel }, {query: startPrimaryLabel});
        this._manager.setOnSelectorsCallback(this.onSelectorChanged);
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


export const startPrimaryLabel = "locations";
export const startSecondaryLabel = "title";

