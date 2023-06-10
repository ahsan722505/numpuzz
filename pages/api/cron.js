import axios from "axios";
export default async function handler(request, response) {
  axios.get("https://numpuzz-server.onrender.com/auth/getStatus");
  axios.get("https://speedtype.onrender.com");
  response.status(200).json({
    message: "Cron job ran successfully",
  });
}
