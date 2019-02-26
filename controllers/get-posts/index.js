const Post = require('../../models/Post')

const getPosts = (req, res) => {
    const query = Post.find({})
    const queryPromise = query.exec()
    
    queryPromise.then(posts => 
        res.send({ data: posts })
    ).catch(error => 
        res.status(500).send({ message: 'Could not retrieve posts'})
    )
}

module.exports = getPosts
