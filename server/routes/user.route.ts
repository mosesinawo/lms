import express from 'express';
import { registrationUser, activateUser, loginUser, logoutUser, updateAccessToken, getUser, socialAuth, updateUserInfo, updatePassword, updateProfilePicture } from '../controllers/user.controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();
userRouter.post('/register', registrationUser)
userRouter.post('/activate-user', activateUser)
userRouter.post('/login', loginUser)
userRouter.get('/logout', isAuthenticated, authorizeRoles('admin'), logoutUser)

userRouter.get('/refresh-token', updateAccessToken)
userRouter.get('/me', isAuthenticated, getUser )

userRouter.post('/social-auth', socialAuth)

userRouter.put('/update-user',isAuthenticated, updateUserInfo)

userRouter.put('/update-password', isAuthenticated, updatePassword)

userRouter.put('/update-user-avatar', isAuthenticated, updateProfilePicture)

export default userRouter;