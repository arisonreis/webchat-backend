import { serverHttp} from './http'
import "../websocket/websocket"
serverHttp.listen(4000, () => {
  console.log(`Server running on port ${4000} 🚀`);
});
