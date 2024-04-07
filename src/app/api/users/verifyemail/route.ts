import { connect } from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'

connect()

export async function POST(req: NextRequest) {
  try {
    //================ get user Token ( START ) =================== 
    const reqBody = await req.json()
    const { token } = reqBody;
    console.log(token);
    //================ get user Token  ( END )  ===================


    //================= find Token from Database ( START ) ================
    let user = new User();
    user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }
    })
    //================= find Token from Database  ( END )  ================


    if (!user) {
      //================= user not found ( START ) ==========================
      console.log("Token Not found")
      return NextResponse.json({ message: "Token Not found" },
        { status: 401 })
      //================= user not found  ( END )  ==========================

    } else {

      //================= user found ( START ) ======================
      console.log('user:::', user);

      user.isVerified = true;
      user.verifyToken = "undefined";
      user.verifyTokenExpiry = "undefined";

      console.log('user :::', user);

      await user.save();

      console.log("Email Verified");
      return NextResponse.json({
        message: "Email Verified",
        status: true
      },
        { status: 200 })
    }
    //================= user found  ( END )  ======================

  } catch (error: any) {
    console.log('error: ', error.message);
    return NextResponse.json({ error: error.message })
  }

}