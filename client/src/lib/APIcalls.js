import * as request from 'superagent'
import {baseUrl} from '../constants'

const handleImageUpload = (file, uploadPreset, imageHandler) => {
  request
    .post('https://api.cloudinary.com/v1_1/isabellabrookes/image/upload')
    .field('upload_preset', uploadPreset)
    .field('file', file)
    .then(response => imageHandler(response.body.secure_url))
    .catch(err=> console.log(err))
}

const getCommentUser = (commentId) => {
  request
    .get(`${baseUrl}/comments/${commentId}`)
    .then(response => Promise.resolve(response.body['__user__']))
    .catch(err => console.log(err))
}

export {handleImageUpload, getCommentUser}
