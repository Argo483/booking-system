import {isBetween} from "../isBetween";
import moment from "moment";

it("should return true if first parameter is between second and third", ()=>{
    expect(isBetween( moment("20111031 01:30", "YYYYMMDD hh:mm"),  moment("20111031 01:01", "YYYYMMDD hh:mm"),  moment("20111031 02:30", "YYYYMMDD hh:mm"))).toEqual(true);
})

it("should return false if first parameter is NOT between second and third", ()=>{
    expect(isBetween( moment("20111031 06:30", "YYYYMMDD hh:mm"),  moment("20111031 01:01", "YYYYMMDD hh:mm"),  moment("20111031 02:30", "YYYYMMDD hh:mm"))).toEqual(false);
})