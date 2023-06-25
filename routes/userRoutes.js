const router = require('express').Router();
const authController = require ('../controllers/authController')
const userController = require ('../controllers/userController')


//auth
router.post("/register", authController.signUp)
router.post("/login", authController.login)
// router.get("logout",userController.logOut)
//get users
router.get("/", userController.getAllUsers)
router.get("/:id", userController.infoUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)
router.patch("/follow/:id", userController.follow)
// router.patch("/unfollow/:id", userController.unfollow)


module.exports = router;