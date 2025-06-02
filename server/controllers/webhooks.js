import { Webhook } from "svix";
import User from "../models/User.js";

//API Controller function to manage clerk user with database

export const clerkWebhooks = async (req, res) => {
  try {
    //Create a Svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    console.log(whook);
    console.log("This is body request", req.body);
    console.log("Request header", req.headers);

    const payload = JSON.parse(req.body.toString());
    //verifying headers
    const evt = whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    console.log("Webhook triggered");
    console.log("Headers:", req.headers);
    console.log("Body received:", req.body);

    //Getting Data from request body
    const { data, type } = evt;

    //Switch case for different events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }
      default:
        console.log("Unhandled webhook type:", type);
        break;
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.log("Webhook Error:", error);
    res.status(400).json({ success: false, message: "Webhooks Error" });
  }
};
