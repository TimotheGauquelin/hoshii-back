const USER_NOT_FOUND = {
      statusCode: 400, // Bad Request
      message: "Cet utilisateur n'existe pas",
    }

const WRONG_PASSWORD = {
      statusCode: 400, // Bad Request
      message: "Mot de Passe invalide",
    }

export { USER_NOT_FOUND, WRONG_PASSWORD }