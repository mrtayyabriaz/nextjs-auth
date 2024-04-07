import mongoose from "mongoose";
export async function connect() {

  try {


    await mongoose.connect(process.env.MONGOOSE_URI!);

    const connection = mongoose.connection
    connection.on("connected", () => {
      console.log("database connected Successfully");
    })

    connection.on("error", (err) => {
      console.log("database connection error: ", err);
      process.exit();
    })


  } catch (error) {
    console.log("database connection error");
    console.log(error);

  }
}