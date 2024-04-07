import { connect } from '@/dbconfig/dbconfig'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { getIdFromToken } from '@/helpers/getIdFromToken'


connect()

export async function POST(req: NextRequest) {
  try {

    const userId = await getIdFromToken(req)
    const user = await User.findOne({ _id: userId }).select('-password');

    if (!user) {
      return Response.json({ message: 'No user found', }, { status: 401 })
    }

    return NextResponse.json({
      message: 'user found',
      data: user
    })




  } catch (error: any) {
    console.log('error: ', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}