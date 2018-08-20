import {
  Authorized,
  Body,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put
} from "routing-controllers";
import {Event} from "./entity"
import {io} from "../index"

@JsonController()
export default class EventController {

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent() {
    const entity = await Event.create().save()

    const event = await Event.findOne(entity.id)

    io.emit('action', {
      type: 'ADD_EVENT',
      payload: event
    })

    return event
  }

  @Authorized()
  @Put('/events/:id')
  @HttpCode(200)
  async updateEvent(
    @Param('id') id: string,
    @Body() update: Partial<Event>
  ) {
    const event = await Event.findOne(id)
    if (!event) throw new NotFoundError(`Event foes not exist`)

    const updatedEvent = await Event.merge(event, update).save()

    io.emit('action', {
      type: 'UPDATE_EVENT',
      payload: updatedEvent
    })

    return updatedEvent
  }

  @Get('/events/:id')
  getEvent(
    @Param('id') id: number
  ) {
    return Event.findOne(id)
  }

  @Get('/events')
  getEvents() {
    return Event.find()
  }
}
