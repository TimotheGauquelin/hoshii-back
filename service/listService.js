import User from "../models/User.js"

const checkListAlreadyExists = async (req, res, next) =>{
    try {
      const list = req.body
      console.log(list)

      const check = await User.findOne(
        { _id: req.params.userId,  "lists._id": req.params.listId, $in: {"lists.$.label": list.label}})

      res.send(check)
    } catch (error) {
      
        next(error)

    }
}

export { checkListAlreadyExists }