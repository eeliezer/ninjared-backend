import { Router } from "express";
import { check } from "express-validator";
import { existeEmail } from "../helpers/validacionesDB";
import { recolectarErrores } from "../middlewares/recolectarErrores";
import { register, verifyUser, recoverPassword, resetPassword, login } from "../controllers/auth";

const router = Router();

router.post(
  "/register",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    //validacion custom
    check("email").custom(existeEmail),
    //middleware custom
    recolectarErrores,
  ],
  register
);

router.patch(
  "/verify",
  [
    check("email", "El email es requerido").isEmail(),
    check("code", "El código de verificación es requerido").not().isEmpty(),
    recolectarErrores,
  ],
  verifyUser
);

router.post(
  "/login",
  [
    check("email", "El email es requerido").isEmail(),
    check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    recolectarErrores,
  ],
  login
);

router.post("/forgot-password",[
  check("email", "El email es requerido").isEmail(),

  recolectarErrores
],
recoverPassword
)

router.patch("/reset-password",[
  check("password", "El password debe ser de 6 caracteres").isLength({
      min: 6
  }),
  check("code", "El código de verificación es requerido").not().isEmpty(),
  recolectarErrores
],
resetPassword
)

export default router;