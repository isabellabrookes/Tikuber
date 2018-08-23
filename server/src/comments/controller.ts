import {
  Authorized,
  Body,
  CurrentUser, Delete, ForbiddenError,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put
} from "routing-controllers";
import {Comment} from "./entity";
import {User} from "../users/entity";
import {io} from "../index";

@JsonController()
export default class CommentController {

  @Get('/comments/:id')
  async getComment(
    @Param('id') id: number,
  ) {
    const comment = await Comment.findOne(id)
    await comment.user
    return comment
  }

  @Get('/comments/')
  async getComments() {
    return await Comment.find()
  }

  @Authorized()
  @Post('tickets/:ticketId/comments/')
  @HttpCode(201)
  async createComment(
    @Param('ticketId') ticketId: number
  ) {
    let entity = await Comment.create()
    entity.ticket.id = ticketId
    entity.save()

    const comment = await Comment.findOne(entity.id)

    io.emit('action', {
      type: 'ADD_COMMENT',
      payload: comment
    })

    return comment
  }

  @Authorized()
    @Put('/comment/:id')
    @HttpCode(200)
    async updateTicket(
      @Param('id') id: number,
      @Body() update: Partial<Comment>,
      @CurrentUser({ required: true }) user: User
    ) {
      const comment = await Comment.findOne(id)
      if (!comment) throw new NotFoundError(`Comment ${id} was not found!`)
      if (user.role.type === "Admin" || user.id === comment.user.id) {
        const updatedComment = await Comment.merge(comment, update).save()

        io.emit('action', {
          type: 'UPDATE_Comment',
          payload: updatedComment
        })

        return updatedComment
      } else throw new ForbiddenError(`User not Authorised`)

    }

  @Authorized()
  @Delete('/comment/:id')
  @HttpCode(200)
  async deleteTicket(
    @Param('id') id: number,
    @CurrentUser({ required: true }) user: User
  ) {
    const comment = await Comment.findOne(id)
    if (!comment) throw new NotFoundError(`Comment ${id} was not found!`)
    if (user.role.type === "Admin" || user.id === comment.user.id) {

      io.emit('action', {
        type: 'DELETE_COMMENT',
        payload: comment
      })

      await Comment.delete(comment)
      return comment
    } throw new ForbiddenError(`User not Authorised`)
  }

}
