
import *  as mocha from "mocha"; 
import * as _expect from "expect";
const expect = _expect as any as typeof _expect.default; // Unfortunately needed
import { shortenToWithinRadius, textShortenConfig } from "./index";

describe('shortenToWithinRadius',  () => {
    
    beforeEach(() => {
        textShortenConfig.maxWidthDivider =  3.1;
        textShortenConfig.lineDivider = 10;
        textShortenConfig.lineBreakBackTrack = 2;
        textShortenConfig.minimumLenght =  4;
    })

    it('Remove the text in small circles', function () {
        expect(shortenToWithinRadius(8, "abc")).toBe("");
        expect(shortenToWithinRadius(8, "ab")).toBe("ab");
        expect(shortenToWithinRadius(8, "the big black brown fox jumped a fence")).toBe("");
        expect(shortenToWithinRadius(30, "the big black brown fox jumped a fence")).toBe("the bi&hellip;");
        expect(shortenToWithinRadius(80, "the big black brown fox jumped a fence")).toBe("the big black brown fox jumped a fence");
    })
});