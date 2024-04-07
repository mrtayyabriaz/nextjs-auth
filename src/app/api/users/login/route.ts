import { connect } from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'



connect()

export async function POST(req: NextRequest) {
  try {



    const reqBody = await req.json()
    const { email, password } = reqBody;

    const user = await User.findOne({ email })

    if (!user) {
      console.log('error: ', 'Check Credentials');
      return NextResponse.json({ error: 'user not found' }, { status: 400 })
    }
    console.log('user found');

    const verifiedPassword = await bcryptjs.compare(password, user.password)
    console.log('user.password::: ', user.password);
    console.log('password::: ', password);
    console.log('verifiedPassword::: ', verifiedPassword);
    if (!verifiedPassword) {
      return NextResponse.json({ error: 'Check Password' }, { status: 400 })
    }

    console.log('Password Matched');


    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' })

    const response = NextResponse.json({
      message: 'user LoggedIn success',
      status: true
    }, { status: 200 })

    response.cookies.set('token', token, {
      httpOnly: true,
    })
    console.log(response.cookies);

    return response;




  } catch (error: any) {
    console.log('error: ', error.message);

    return NextResponse.json(
      { error: error.message },
      { status: 500 })
  }
}