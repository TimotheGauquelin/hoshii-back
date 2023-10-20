import db from "../db.js"

const getAllTrialsDoneByAGroupService = async (req, res) => {

  try {
    const USER_ID = req.params.id
    const { rows } = await db.query(
      "select name, score, is_done, title, max_score from users_group JOIN group_trial on group_trial.group_id = users_group.id join trial on group_trial.trial_id = trial.id where users_group.id = $1",
      [USER_ID]
    );
  
    return res
      .status(200)
      .json({ msg: "Groupe enregistré", trials: rows});

  } catch (error) {

    console.log(error)

  }
    
};

export { getAllTrialsDoneByAGroupService }