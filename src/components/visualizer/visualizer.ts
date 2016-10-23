import * as d3 from 'd3'
import * as $ from "jquery";
import { ILoader, StandardLoader, NodeHierarchyElement, Node, BaseElement } from './elements';

import { IGroup, ISelector, ISelectorManager, IGroupRepository } from '../../model'
import { IVisualizerConfig } from './visualizer-config'


export class Visualizer extends BaseElement {

    private _loader: ILoader;
    private _svg: d3.Selection<any>;
    private _nodeHierarchy: NodeHierarchyElement;

    constructor(
            private _manager: ISelectorManager,
            private _repository: IGroupRepository,
            config: IVisualizerConfig) {
        super(config);
    
    }

    /**
    * Sets data and shows it on the screen.
    *  @param {boolean} isLoading
    */
    set data(data: Array<IGroup>) {

        
        if (!this._nodeHierarchy) {
            // If the _nodeHierarchy is not created draw has not been called
            this.initalize();
        }
        this.isLoading = false;
        this._nodeHierarchy.data = data;

    }

    /**
     * Set whether or not a loader should be shown.
     *  @param {boolean} isLoading
     */
    set isLoading(isLoading: boolean) {
        if (isLoading) {
            this._loader.startLoader();
        } else {
            this._loader.stopLoader();
        }
    }

    /** 
     * Draws the board and initialised related components.
     * Draw is defined elsewhere as it ensures the class can be constructed prior to actually be shown.
     * draw() should be called before setData to show loading while data is being fetched
     * */
    initalize() {

        this._repository.getSelectors().then((selectors) => {
            if (!selectors ||  selectors.length == 0) {
                log.error("No selectors found")
            }
            this.onSelectorChanged({ query: selectors[0].query }, { query: selectors[0].children[0].query });
            this._manager.setSelectors(selectors);
        })

        this._svg = d3.select(this.targetId).append("svg")
            .attr("viewBox", `0 0 ${$(this.targetId).width()} ${$(this.targetId).height()}`)

        this._loader = new StandardLoader(this._svg, this._config);
        this.isLoading = true;

        this._manager.setOnSelectorsCallback(this.onSelectorChanged);
        this._nodeHierarchy = new NodeHierarchyElement(this._svg, this._config);
    }



    private onSelectorChanged = (primary: ISelector, secondary: ISelector) => {
        if (this._nodeHierarchy) {
            this._nodeHierarchy.clean();
        }
        this.isLoading = true;
        this._repository.getGroups(primary, secondary)
            .then((groups) => {
                if(!groups || groups.length === 0) {
                    log.warn(`No data was received for query with primary (${primary.query}) and secondary (${secondary.query}) `)
                     this.showError();
                }
                this.data = groups;
            }).catch((reason: any) => {
                 log.warn(`Received error from repository while getting groups with reason: <${reason}>  `)
                 this.showError();
            })
    }

    private showError() {
        this._svg.append("text")
            .attr("x", +$(this.targetId).width() /2)
            .attr("y", +$(this.targetId).height() /2)
            .text("Error while receiving data. Please try again.")
    }


}

