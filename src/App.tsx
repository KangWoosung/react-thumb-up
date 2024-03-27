/*   2024-03-24 18:45:22

Thumb-Up 컴포넌트….

모든 프로젝트에서 범용으로 활용할 수 있는, thumb-up 커포넌트를 만들자.

	<ReactThumbUp_v01
    auth={true}
    thumbUpCnt={thumbUpCnt}
    setThumbUpCnt={setThumbUpCnt}
    thumbDownCnt={thumbDownCnt}
    setThumbDownCnt={setThumbDownCnt}
	/>	

*/

import { useEffect, useState } from "react";
import ReactThumbUp_v01 from "./modules/thumb-up/ReactThumbUp_v01";

function App() {
  const [thumbUpCnt, setThumbUpCnt] = useState<number>(12);
  const [thumbDownCnt, setThumbDownCnt] = useState<number>(4);
  const [thumbUpCnt2, setThumbUpCnt2] = useState<number>(541);
  const [thumbDownCnt2, setThumbDownCnt2] = useState<number>(49);

  useEffect(() => {
    // DB Update Function comes here..
    console.log("thumbUpCnt:", thumbUpCnt);
    console.log("thumbDownCnt:", thumbDownCnt);
  }, [thumbUpCnt, thumbDownCnt]);

  return (
    <>
      <h1>React Thumb Up v01</h1>
      <p>
        <br />
        <br />
        <br />
      </p>
      <ReactThumbUp_v01
        auth={true}
        thumbUpCnt={thumbUpCnt}
        setThumbUpCnt={setThumbUpCnt}
        thumbDownCnt={thumbDownCnt}
        setThumbDownCnt={setThumbDownCnt}
      >
        {/* I Like It!! */}
      </ReactThumbUp_v01>
      <p>
        <br />
        <br />
        <br />
      </p>
      <ReactThumbUp_v01
        auth={false}
        thumbUpCnt={thumbUpCnt2}
        setThumbUpCnt={setThumbUpCnt2}
        thumbDownCnt={thumbDownCnt2}
        setThumbDownCnt={setThumbDownCnt2}
      >
        {/* I Like It!! */}
      </ReactThumbUp_v01>
    </>
  );
}

export default App;
