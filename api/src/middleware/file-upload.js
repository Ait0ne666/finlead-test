const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    },


})





const  uploadFile = (name) => (req, res, next) => {
    const upload = multer({
        dest: 'upload/', storage: storage,
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                return callback(new Error('Only jpg and jpeg images are allowed'))
            }
            callback(null, true)
        },
    
    }).single(name)

    return upload(req, res,  (err) => {
        if (err) {
            return res.status(400).send({
                errors: [
                    {
                        msg: err.message
                    }
                ]
            })
        }
        next()
    })
}


module.exports = {
    uploadFile
}