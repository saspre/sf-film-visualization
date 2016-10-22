


export const shortenToWithinRadius = (radius: number, text: string): string => {
    var maxWidth = radius / 2;
        var lines = radius / 10;
        text = text.split(/\s+/g).map((s) => {
            if(s.length >= maxWidth) {
                const margin = 5;
                return s.substr(0, maxWidth - margin) + 
                        "-\n" + 
                        s.substr(maxWidth - margin + 1, s.length)
            }
            return s;
        }).join(" ");
        if(text && text.length > maxWidth * lines) {
            return text.substr(0, maxWidth - 3) + "&hellip;"
        }
        return text;
}
   