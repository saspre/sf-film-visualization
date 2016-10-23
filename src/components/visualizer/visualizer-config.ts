
export interface IVisualizerConfig {

     /**
     * Defines the selector (targetId) for which element to attahc the SVG to.
     */
    targetId?: string;
    /**
     * Defines the minimumValue to be drawn
     */
    minimumValue?: number;  

    /**
     * Defines the limit for when the minimumValue should be ignored.
     */
    ignoreMinimumBelow?: number;
}