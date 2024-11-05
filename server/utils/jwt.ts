require("dotenv").config();
import {Response} from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

interface ITokenOptions{
    expires: Date;
    maxAge: number;
    httpOnly:boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?: boolean;
}

 //parse environment variables to integrate fallback values
 const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRATION || (5 * 60).toString(), 10);
 const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRATION || (30 * 24 * 60 * 60).toString(), 10); 

 //options for cookies

export const accessTokenCookieOptions: ITokenOptions = {
     expires: new Date(Date.now() + accessTokenExpire ),
     maxAge: accessTokenExpire * 1000,
     httpOnly: true,
     sameSite: 'lax',
    
 };

export const refreshTokenCookieOptions: ITokenOptions = {
     expires: new Date(Date.now() + refreshTokenExpire ),
     maxAge: refreshTokenExpire * 1000,
     httpOnly: true,
     sameSite: 'lax',
    
 };


export const sendToken = (user: IUser, statusCode: number, res:Response) =>{
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();

    //upload session to redis
    redis.set(user._id as string, JSON.stringify(user) as any)

   

    if(process.env.NODE_ENV === 'production'){
        accessTokenCookieOptions.secure = true;
        refreshTokenCookieOptions.secure = true;
    }
    
    res.cookie('access_token', accessToken, accessTokenCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshTokenCookieOptions);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        // refreshToken,
    });
    
}