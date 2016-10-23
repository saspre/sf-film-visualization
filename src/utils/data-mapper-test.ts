
import *  as mocha from "mocha"; 
import * as _expect from "expect";
const expect = _expect as any as typeof _expect.default; // Unfortunately needed
import { groupMapperFactory } from "./index";

describe('IGroupMapperFactory',  () => {
    let valueLabel = "COUNT_locations"
    let titleLabel = "title"

    let data: Array<any> = [
        {
            "COUNT_locations": "17",
            "title": "Americana"
        },
        {
            "COUNT_locations": "14",
            "title": "The Game"
        }]
   
  
    it('should create a function that maps any to IGroup array', function () {
        let func = groupMapperFactory(titleLabel, valueLabel);

        expect(func(data).length).toBe(2);
        expect(func(data)[0].name).toBe("Americana");
    })

    it('should handle empty array', function () {
        let func = groupMapperFactory(titleLabel, valueLabel);

        expect(func([]).length).toBe(0);
   
    })


    it('should return null if input is null', function () {
        let func = groupMapperFactory(titleLabel, valueLabel);

        expect(func(null)).toBe(null); 
   
    })
    

    
 
});