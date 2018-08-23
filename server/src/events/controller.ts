import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  ForbiddenError,
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
import {Ticket} from "../tickets/entity";
import {User} from "../users/entity";

@JsonController()
export default class EventController {

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

  @Get('/events/:id/tickets')
  getTicketsForEvent(
    @Param('id') id: number
  ) {
    return Ticket.find({where: {Event: id}})
  }

  @Authorized()
  @Post('/events')
  @HttpCode(201)
  async createEvent(
    @Body() data: Event,
    @CurrentUser({ required: true }) user: User,
  ) {
    if (user.role.type !== "Admin") throw new ForbiddenError(`User not Authorised`)

    const entity = await Event.create(data).save()
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
    @Param('id') id: number,
    @Body() update: Partial<Event>,
    @CurrentUser({ required: true }) user: User
  ) {
    if (user.role.type !== "Admin") throw new ForbiddenError(`User not Authorised`)
    const event = await Event.findOne(id)
    if (!event) throw new NotFoundError(`Event was not found!`)

    const updatedEvent = await Event.merge(event, update).save()

    io.emit('action', {
      type: 'UPDATE_EVENT',
      payload: updatedEvent
    })

    return updatedEvent
  }

  @Authorized()
    @Delete('/events/:id')
    @HttpCode(200)
    async deleteEvent(
      @Param('id') id: number,
      @CurrentUser({ required: true }) user: User
    ) {
      const event = await Event.findOne(id)
      if (!event) throw new NotFoundError(`Event ${id} was not found!`)
      if (user.role.type !== "Admin") throw new ForbiddenError(`User not Authorised`)
      io.emit('action', {
        type: 'DELETE_EVENT',
        payload: event
      })

      await Event.delete(event)
      return  event
    }

}
