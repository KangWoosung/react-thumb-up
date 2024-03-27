/*   2024-03-24 18:45:22

Thumb-Up 컴포넌트….

모든 프로젝트에서 범용으로 활용할 수 있는, thumb-up 커포넌트를 만들자.

	<ReactThumbUp_v01
		auth={true}
		articleObject={articleObject}
		userObject={userObject}
		thumbUpCnt={thumbUpCnt}
		onClick={setThumbUpCnt}
	/>	

*/

import { useEffect, useState } from "react";
import ReactThumbUp_v01 from "./modules/thumb-up/ReactThumbUp_v01";

function App() {
  const [thumbUpCnt, setThumbUpCnt] = useState<number>(12);
  const [thumbDownCnt, setThumbDownCnt] = useState<number>(4);

  useEffect(() => {
    // DB Update Rutine comes here..
    console.log("thumbUpCnt:", thumbUpCnt);
    console.log("thumbDownCnt:", thumbDownCnt);
  }, [thumbUpCnt, thumbDownCnt]);

  return (
    <>
      <h1>React Thumb Up v01</h1>
      <ReactThumbUp_v01
        auth={true}
        articleObject={{ title: "React Thumb Up v01" }}
        userObject={{ name: "user01" }}
        thumbUpCnt={thumbUpCnt}
        setThumbUpCnt={setThumbUpCnt}
        thumbDownCnt={thumbDownCnt}
        setThumbDownCnt={setThumbDownCnt}
      >
        {/* I Like It!! */}
      </ReactThumbUp_v01>
    </>
  );
}

export default App;
