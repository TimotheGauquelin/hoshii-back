import { getAllTrialsDoneByAGroupService } from "../service/trialService.js"

const getAllTrialsDoneByAGroupControler = async (req, res, next) => {

    try {

      const RESPONSE = await getAllTrialsDoneByAGroupService(req, res, next);
      return RESPONSE

    } catch(error) {
  
      next(error);
      
    }
}

export { getAllTrialsDoneByAGroupControler }