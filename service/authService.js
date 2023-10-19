import { hashedPassword } from "../security/passwordUtils.js";
import db from "../db.js"
import { createJWT } from "../security/jwtUtils.js";

const registerService = async (req, res) => {

  try {

    const { name, password } = req.body;
  
    const HASHED_PASSWORD = await hashedPassword(password);
  
    await db.query(
      "INSERT INTO users_group (name, password) VALUES ($1, $2) RETURNING *",
      [name, HASHED_PASSWORD]
    );
  
    return res
      .status(201)
      .json({ msg: "Groupe enregistré" });

  } catch (error) {

    console.log(error)

  }
    
};

const loginService = async (user, req, res, next) => {

  try {
    const TOKEN = createJWT({
      userId: user.id,
      name: user.name,
      role: user.role,
    });

    return res.status(200).json({ msg: "Utilisateur connecté", token: TOKEN });
    
  } catch (error) {

    console.log(error)

  }

}

export { registerService, loginService }