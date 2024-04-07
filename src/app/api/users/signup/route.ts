import { connect } from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import User from '@/models/userModel'
import MailSend from '@/helpers/mailSender';
connect();
console.log("connect completed");

export async function POST(req: NextRequest) {
  // return NextResponse.json({ message: "nice" }, { status: 200 })
  try {







    const { username, email, password } = await req.json();
    // console.log("request:", req);

    //================= find already exist ( START ) =================
    // email
    const user = await User.findOne({ email })

    if (user) {
      return NextResponse.json(
        { error: "email already exist" },
        { status: 401 }
      )
    }

    // username
    const usernamefind = await User.findOne({ username })

    if (usernamefind) {
      return NextResponse.json(
        { error: "username already taken" },
        { status: 400 }
      )
    }
    //================= find already exist  ( END )  =================

    //=================== password ( START ) ===================== 
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt)
    //=================== password  ( END )  =====================


    //==================== save ( START ) ========================
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    })

    // console.log('newUser:::', newUser);
    const savedUser = await newUser.save();
    console.log('savedUser:::', savedUser);

    NextResponse.json({
      message: 'user signed successfully',
      success: true,
      savedUser
    },
      { status: 200 })
    //==================== save  ( END )  ========================


    //==================== send mail ( START ) ===================
    await MailSend({
      usermail: email,
      mailType: 'VERIFY',
      userID: savedUser._id.toString(),
    })
    //==================== send mail  ( END )  ===================


    //==================== success ( START ) =====================
    return NextResponse.json({
      message: 'user signed successfully.',
      success: true,
      savedUser
    },
      { status: 200 })
    //==================== success  ( END )  =====================











  } catch (error: any) {
    console.log('error:::', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
