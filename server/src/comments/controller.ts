import {
  Authorized,
  Body,
  CurrentUser, Delete, ForbiddenError,
  Get,
  HttpCode, InternalServerError,
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
  getComment(
    @Param('id') id: number,
  ) {
    return Comment.findOne(id)
  }

  @Get('/comments')
  getComments() {
    return Comment.find()
  }

  @Authorized()
  @Post('/comments')
  @HttpCode(201)
  async createComment(
    @Body() data: Comment
  ) {
    const entity = await Comment.create(data).save()
    const comment = await Comment.findOne(entity.id)

    if (!comment) throw new InternalServerError(`Comment Not Created`)

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
