const Post = require('../../models/Post')
const {
    buildDBPagingParams,
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE
} = require('../../utils')

const getPosts = (req, res) => {
    const {
        title,
        image,
        thumbnail,
        id,
        type
    } = req.query

    const page = Number(req.query.page) || DEFAULT_PAGE
    const pageSize = (
        Number(req.query.pageSize) || DEFAULT_PAGE_SIZE
    )

    const { skip, limit } = buildDBPagingParams(page, pageSize)

    const query = Post.find({
        ...(title ? { title } : undefined),
        ...(image ? { images: image } : undefined),
        ...(thumbnail ? { thumbnailImage: thumbnail } : undefined),
        ...(type ? { type } : undefined),
        ...(id ? { _id: id } : undefined),
    }).skip(skip).limit(limit)
    const countQuery = Post.countDocuments({})

    const countQueryPromise = countQuery.exec()
    const queryPromise = query.exec()
    Promise.all([
        queryPromise,
        countQueryPromise
    ]).then(([ posts, total ]) =>
        res.send({
            data: posts,
            meta: { page, pageSize, total }
        })
    ).catch(error =>
        res.status(500).send({
            errors: [{ message: 'An unknown error occurred' }],
            message: 'Could not retrieve posts'
        })
    )
}

module.exports = getPosts
