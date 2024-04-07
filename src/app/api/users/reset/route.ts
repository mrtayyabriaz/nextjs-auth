import { connect } from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'

connect()

export async function POST(req: NextRequest) {
  try {
    //================ get user Token ( START ) =================== 
    const reqBody = await req.json()
    const { token } = reqBody;
    const { password } = reqBody;
    console.log(token);
    console.log(password);
    //================ get user Token  ( END )  ===================


    //================= find Token from Database ( START ) ================
    let user = new User();
    user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() }
    })
    //================= find Token from Database  ( END )  ================


    if (!user) {
      //================= user not found ( START ) ==========================
      console.log("Token Not found")
      return NextResponse.json({ message: "invalid Token" },
        { status: 401 })
      //================= user not found  ( END )  ==========================

    } else {

      //=================== password ( START ) ===================== 
      const salt = await bcryptjs.genSalt(10);
      const hashPassword = await bcryptjs.hash(password, salt)
      //=================== password  ( END )  =====================

      //================= user found ( START ) ======================
      console.log('user:::', user);

      user.password = hashPassword;
      user.forgotPasswordToken = "undefined";
      user.forgotPasswordTokenExpiry = "undefined";

      console.log('user :::', user);

      await user.save();

      console.log("Password Updated");
      return NextResponse.json({
        message: "Password Updated",
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