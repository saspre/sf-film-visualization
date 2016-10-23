

/** 
 * This method takes the radius of the circle and the text and attempts to 
 * shorten the text such that it fits within the circle. 
 * The method could use an overhaul and take the font size as input. 
 * Or better it should try and calculate the size and then fit words into to each line 
 * such that they form a circle. 
 */
export const shortenToWithinRadius = (radius: number, text: string): string => {
        var maxWidth = radius / 3.1;
        var lines = radius / 10;
        if(!text) {
            return "";
        }
        text = text.split(/\s+/g).map((s) => {
            if(s.length >= maxWidth) {
                const margin = 2;
                return s.substr(0, maxWidth - margin) + 
                        "-<br>" + 
                        s.substr(maxWidth - margin + 1, s.length)
            }
            return s;
        }).join(" ");

        
        if(text && text.length > maxWidth * lines) {
            let substr =  text.substr(0, maxWidth - 3);
            if(substr.length < 5) {
                return "";
            }
            return substr + "&hellip;"
        }
        return text;
}
   