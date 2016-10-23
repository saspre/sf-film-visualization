
var config = {

    /** 
     * Defines the ratio between line length and radius.
    */
    maxWidthDivider: 3.1,
    
    /**
     * Defines the ratio between lines and radius.
     */
    lineDivider: 10,

    /**
     * Defines how many chars it should go back before inserting -
     */
    lineBreakBackTrack: 2,

    /**
     * If the resulting string is only 4 chars e.g. (a...) we remove it. 
     */
    minimumLenght: 4
}

export var textShortenConfig = config;

/** 
 * This method takes the radius of the circle and the text and attempts to 
 * shorten the text such that it fits within the circle. 
 * The method could use an overhaul and take the font size as input. 
 * Or better it should try and calculate the size and then fit words into to each line 
 * such that they form a circle. 
 */
export const shortenToWithinRadius = (radius: number, text: string): string => {
        
        var maxWidth = radius / config.maxWidthDivider;
        var lines = radius / config.lineDivider;
        if(!text) {
            return "";
        }

        text = text.split(/\s+/g).map((s) => {
            if(s.length >= maxWidth) {
                const margin = config.lineBreakBackTrack;
                return s.substr(0, maxWidth - margin) + 
                        "-<br>" + 
                        s.substr(maxWidth - margin + 1, s.length)
            }
            return s;
        }).join(" ");

        
        if(text && text.length > maxWidth * lines) {
            let substr =  text.substr(0, maxWidth - 3);
            if(substr.length <= config.minimumLenght) {
                return "";
            }
            return substr + "&hellip;"
        }
        return text;
}
   