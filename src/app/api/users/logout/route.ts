import { connect } from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function GET(req: NextRequest) {
  try {




    //================ create response ( START ) ==================
    const response = NextResponse.json({
      message: 'user Logged out successfully',
      status: true
    }, { status: 200 })
    //================ create response  ( END )  ==================


    //================ set cookie ( START ) =======================
    response.cookies.set('token', '', {
      httpOnly: true,
      expires: new Date(0)
    })
    //================ set cookie  ( END )  =======================

    return response;





  } catch (error: any) {
    console.log('error: ', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 })

  }
}