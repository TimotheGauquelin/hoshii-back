import User from "../models/User.js"

async function getById (req, res, next) {
    try {

        return await User
            .findOne({ _id: req.params.userId })
            .orFail()

    } catch (err) {

        next(err)

    }
}

async function addAList (user, req, res, next) {

    try {

        return await User.updateOne(
            { _id: req.params.userId },
            { $push: { lists: req.body }},
        );

    } catch(err) {

        next(err)

    }
}

async function addAPresent(user, req, res, next) {

    try {

        return await User.updateOne(
            { _id: req.params.userId, "lists._id": req.params.listId },
            { $push: { "lists.$.presents": req.body }},
        );

    } catch(err) {

        next(err)

    }

}

async function deleteAList(req, res, next) {

    try {

        return await User.updateOne(
            { _id: req.params.userId },
            { $pull: { lists: {_id: req.params.listId} }},
        );

    } catch(err) {

        next(err)

    }

}

async function deleteAPresent(req, res, next) {

    try {

        return await User.updateOne(
            { _id: req.params.userId, "lists._id": req.params.listId },
            { $pull: { "lists.$.presents":  {_id: req.params.presentId} }},
        );

    } catch(err) {

        next(err)

    }

}

async function updateAList(req, res, next) {

    try {

        return await User.updateOne(
            { _id: req.params.userId, "lists._id": req.params.listId },
            { $set: { "lists.$.label": req.body.label} }
        );

    } catch(err) {

        next(err)

    }

}

async function updateAPresent(req, res, next) {

    try {

        return await User.updateOne(
            { _id: req.params.userId },
            { $set: { "lists.$[list].presents.$[present].label": req.body.label} },
            { arrayFilters: [{"list._id": req.params.listId}, {"present._id": req.params.presentId}], new: true}
        );


    } catch(err) {

        next(err)

    }

}

export { getById, addAList, addAPresent, deleteAList, deleteAPresent, updateAList, updateAPresent}