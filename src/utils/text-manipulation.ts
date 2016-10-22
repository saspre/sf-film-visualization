


export const shortenToWithinRadius = (radius: number, text: string): string => {
    var maxWidth = radius / 2;
        var lines = radius / 8;
        if(text && text.length > maxWidth * lines) {
            return text.substr(0, maxWidth - 3) + "&hellip;"
        }
        return text;
}
   