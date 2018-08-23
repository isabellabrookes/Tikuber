import {Get, JsonController} from "routing-controllers";
import {Venue} from "./entity";

@JsonController()
export default class VenueController {

  @Get('/venues')
  getVenues(){
    return Venue.find()
  }
}
