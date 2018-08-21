import {
  Authorized,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
  Body,
  CurrentUser,
  ForbiddenError, Delete
} from "routing-controllers";
import {Ticket} from "./entity";
import {io} from "../index";
import {User} from "../users/entity";

@JsonController()
export default class TicketController {

  @Get('/tickets/:id')
  getTicket(
    @Param('id') id: number
  ) {
    return Ticket.findOne(id)
  }

  @Get('/tickets')
  getTickets() {
    return Ticket.find()
  }

  @Authorized()
  @Post('/events/:eventId/tickets/')
  @HttpCode(201)
  async addTicket(
    @Param('eventId') eventId: number
  ){
    let entity = await Ticket.create()
    entity.event.id = eventId
    entity.save()

    const ticket = await Ticket.findOne(entity.id)

    io.emit('action', {
      type: 'ADD_TICKET',
      payload: ticket
    })

    return ticket
  }

  @Authorized()
  @Put('/tickets/:id')
  @HttpCode(200)
  async updateTicket(
    @Param('id') id: number,
    @Body() update: Partial<Ticket>,
    @CurrentUser({ required: true }) user: User
  ) {
    const ticket = await Ticket.findOne(id)
    if (!ticket) throw new NotFoundError(`Ticket was not found!`)
    console.log(user.role.type)
    console.log(ticket.sellerUser.id)
    if (user.role.type === "Admin" || user.id === ticket.sellerUser.id) {
      const updatedTicket = await Ticket.merge(ticket, update).save()

      io.emit('action', {
        type: 'UPDATE_TICKET',
        payload: updatedTicket
      })

      return updatedTicket
    } else throw new ForbiddenError(`User not Authorised`)

  }

  @Authorized()
  @Delete('/tickets/:id')
  @HttpCode(200)
  async deleteTicket(
    @Param('id') id: number,
    @CurrentUser({ required: true }) user: User
  ) {
    const ticket = await Ticket.findOne(id)
    if (!ticket) throw new NotFoundError(`Ticket ${id} was not found!`)
    if (user.role.type === "Admin" || user.id === ticket.sellerUser.id) {

      io.emit('action', {
        type: 'DELETE_TICKET',
        payload: ticket
      })

      await Ticket.delete(ticket)
      return ticket
    } throw new ForbiddenError(`User not Authorised`)
  }
}
