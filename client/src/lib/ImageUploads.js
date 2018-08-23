import * as request from 'superagent'

const handleImageUpload = (file, uploadPreset, imageHandler) => {
  request
    .post('https://api.cloudinary.com/v1_1/isabellabrookes/image/upload')
    .field('upload_preset', uploadPreset)
    .field('file', file)
    .then(response => imageHandler(response.body.secure_url))
    .catch(err=> console.log(err))
}

export {handleImageUpload}
