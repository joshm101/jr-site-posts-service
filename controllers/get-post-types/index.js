const PostType = require('../../models/PostType')

const getPostTypes = (req, res) => {
    const query = PostType.find({})
    const queryPromise = query.exec()

    queryPromise.then(postTypes =>
        res.send({ data: postTypes })
    ).catch(error =>
        res.status(500).send({
            errors: [{ message: 'An unknown error occurred' }],
            message: 'Could not retrieve post types'
        })
    )
}

module.exports = getPostTypes
