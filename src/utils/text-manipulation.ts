


export const shortenToWithinRadius = (radius: number, text: string): string => {
    var maxWidth = radius / 3;
        var lines = radius / 10;
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
            return text.substr(0, maxWidth - 3) + "&hellip;"
        }
        return text;
}
   