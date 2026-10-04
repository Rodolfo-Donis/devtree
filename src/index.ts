import colors from "colors";
import server from "./server";
// express instance

//union for Port
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(colors.bgBlue.magenta.bold("Server is working!"), PORT);
});