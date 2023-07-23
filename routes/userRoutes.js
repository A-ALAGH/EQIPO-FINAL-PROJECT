const router = require('express').Router();
const authController = require ('../controllers/authController')
const userController = require ('../controllers/userController')

//auth
router.post("/register", authController.signUp)
router.post("/login", authController.login)
router.post("/check-duplicate", authController.checkDuplicate);

//get users
router.get("/", userController.getAllUsers)
router.get("/:userId", userController.infoUser)
router.put("/:userId", userController.updateUser)
router.delete("/:userId", userController.deleteUser)
router.patch("/follow/:id", userController.follow)
// router.patch("/unfollow/:id", userController.unfollow)

module.exports = router;



module.exports = router;