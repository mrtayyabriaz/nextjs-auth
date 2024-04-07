import { connect } from "@/dbconfig/dbconfig";
import MailSend from "@/helpers/mailSender";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  //================== send mail ( START ) ======================

  try {

    const { email } = await req.json();
    const user = await User.findOne({ email });

    if (user) {
      // email found


      const mailStatus = await MailSend({ usermail: email, mailType: "RESET", userID: user._id.toString() })
      if (mailStatus) {
        return NextResponse.json({ message: 'Verification mail sent', data: user })
      }
    } else {
      return NextResponse.json({ message: 'E-mail not found' })
    }



  } catch (error) {
    console.log('error::', error);
    return NextResponse.json({ message: error?.toString() }, { status: 401 })
  }
  //================== send mail  ( END )  ======================
}
