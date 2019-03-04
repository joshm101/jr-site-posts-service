const Post = require('../../models/Post')

const getPosts = (req, res) => {
    const {
        title,
        image,
        thumbnail,
        id,
        type
    } = req.query

    const query = Post.find({
        ...(title ? { title } : undefined),
        ...(image ? { images: image } : undefined),
        ...(thumbnail ? { thumbnailImage: thumbnail } : undefined),
        ...(type ? { type } : undefined),
        ...(id ? { _id: id } : undefined),
    })
    const queryPromise = query.exec()

    queryPromise.then(posts =>
        res.send({ data: posts })
    ).catch(error =>
        res.status(500).send({
            errors: [{ message: 'An unknown error occurred' }],
            message: 'Could not retrieve posts'
        })
    )
}

module.exports = getPosts
