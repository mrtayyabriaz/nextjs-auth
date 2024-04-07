import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import User from "@/models/userModel";

export async function getIdFromToken(request: any) {
  const token = request.cookies.get('token')?.value || ''
  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

  return decodedToken.id;
}