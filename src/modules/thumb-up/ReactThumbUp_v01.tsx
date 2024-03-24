/*  2024-03-24 19:01:18


<ReactThumbUp_v01
    auth={true}
    articleObject={articleObject}
    userObject={userObject}
    thumbUpCnt={thumbUpCnt}
    onClick={setThumbUpCnt}
/>	

1. thubmAction 은 유저에게 1회만 허용한다. 
허용 Authentication 은, 일단 훅으로 해결하고, 나중에 OAuth 연계가 가능해지도록 구성해보자.
2. thubmAction 에 토글을 줘서, thubmAction thubmCancel 이 토글되도록 하자. 
3. thubmAction 이 완료된 상태라면 컬러 또는 락 표시를 해주자. 
4. 

*/

import { PiThumbsDownDuotone, PiThumbsUpDuotone } from "react-icons/pi";
import { defaultThumbConfig } from "./defaultThumbConfig";

type ThumbStyleType = {
  fontSize: string;
  color?: string;
  fill: string;
};

type ReactThumbUpProps = {
  auth: boolean;
  articleObject: { title: string };
  userObject: { name: string };
  thumbUpCnt: number;
  setThumbUpCnt: (cnt: number) => void;
  thumbDownCnt: number;
  setThumbDownCnt: (cnt: number) => void;
};

const ReactThumbUp_v01 = ({
  auth,
  thumbUpCnt,
  setThumbUpCnt,
  thumbDownCnt,
  setThumbDownCnt,
}: ReactThumbUpProps) => {
  const defaultThumbUpStyle: ThumbStyleType = {
    fontSize: defaultThumbConfig.size,
    color: defaultThumbConfig.color.unfilled,
    fill: "",
  };

  return (
    <>
      <div className="flex flex-container">
        <PiThumbsUpDuotone
          className="cursor-pointer "
          key="thumbUp"
          onClick={() => {
            auth ? setThumbUpCnt(thumbUpCnt + 1) : null;
          }}
          style={{
            ...defaultThumbUpStyle,
            fill:
              thumbUpCnt > 0
                ? defaultThumbConfig.color.filled
                : defaultThumbConfig.color.unfilled,
          }}
        />
        {thumbUpCnt}
        <PiThumbsDownDuotone
          className="cursor-pointer"
          key="thumbDown"
          onClick={() => {
            auth ? setThumbDownCnt(thumbDownCnt + 1) : null;
          }}
          style={{
            ...defaultThumbUpStyle,
            fill:
              thumbUpCnt < 0
                ? defaultThumbConfig.color.filled
                : defaultThumbConfig.color.unfilled,
          }}
        />
        {thumbDownCnt}
      </div>
    </>
  );
};

export default ReactThumbUp_v01;
