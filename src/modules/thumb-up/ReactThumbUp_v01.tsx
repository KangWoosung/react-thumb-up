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
4. 상태관리 구조가 생각외로 좀 복잡하다. state 보다는 useReducer 가 등장해야 할 상황인 듯..
5. initialState 부터 구성해보자. 
    Action 의 종류부터... 
    a. 사용자에게는 thumbUp, thumbDown 둘 중 하나의 액션만 허용된다. 
    b. thumbUp 이 완료된 상태에서 thumbDown 이 클릭되면, thumbUp 은 취소된다.
    c. thumbDown 이 완료된 상태에서 thumbUp 이 클릭되면, thumbDown 은 취소된다.
    d. thumbUp 이 완료된 상태에서 thumbUp 이 다시 클릭되면, thumbUp 은 취소된다. 
    e. thumbDown 이 완료된 상태에서 thumbDown 이 다시 클릭되면, thumbDown 은 취소된다.
    
일단은, setThumbCount({thumbUpObject}) 펑션이 필요하다. 


대략 여기까지만 적어놔도 좀 많이 복잡하긴 한데,
initState 만 잘 만들어 놓으면, 코파일럿이 대충 와꾸를 짜 줄 수 있을 것 같다.

Star-Rate 는 모듈로 필요하겠다고 생각해서 만들었었는데,
Like-button 따위.... 를 뭐 컴포넌트 작업해둘 필요나 있겠어.... 라고 생각했지만, 그냥 손댔다가..
간단치 않은 문제라는 걸 확인했다. 
<ThumbUpButton />,  <HeartButton /> 뭐가 됐든, 앞으로 무조건 공장에서 찍어내듯 생산해서 창고에 넣어두자. 

2024-03-27 19:53:40
생각외로 로직이 복잡하다는 걸 깨달았다. 
reducer 에서는 thumbUp, thumbUpCancel 만 처리하도록 놔두고,
onClick 펑션에서, thumbUp 인지, thumbUpCancel 인지 상황을 판단해서 Action 을 구성하도록 방향을 잡아야겠다.

2024-03-27 20:28:41
discreminated union 을 써야만 typeScript 로 ActionType 을 사용할 수 있는 것 같다.
지금은 너무 복잡해서, Actions 를 분리해내는 코드를 피하고 구현에만 집중하기로 하자. 

2024-03-27 20:47:23
이 모듈에서는, 액션의 결과 상태값만 만들어준다. 
DB 의 값을 변경시키는 Prisma 액션은 부모 컴포넌트에서 상태를 감시하는 useEffect 에서 처리해주면 된다. 


*/

import { PiThumbsDownDuotone, PiThumbsUpDuotone } from "react-icons/pi";
import { defaultThumbConfig } from "./defaultThumbConfig";
import { ReactNode, useEffect, useReducer, useRef } from "react";
import { thumbupReducer } from "./reducer/thumbupReducer";
import "./style/style.css";

export type ThumbUpInitialStateType = {
  thumbUpCnt: number;
  thumbDownCnt: number;
  auth: boolean;
  thumbUpActioned: boolean;
  thumbDownActioned: boolean;
  lastAtion: string | null;
};

const thumbUpInitialState: ThumbUpInitialStateType = {
  thumbUpCnt: 0,
  thumbDownCnt: 0,
  auth: true,
  thumbUpActioned: false,
  thumbDownActioned: false,
  lastAtion: "",
};

type ThumbStyleType = {
  fontSize: string;
  color?: string;
  fill: string;
};

type ReactThumbUpPropsType = {
  auth: boolean;
  thumbUpCnt: number;
  setThumbUpCnt: (cnt: number | ((prev: number) => number)) => void;
  thumbDownCnt: number;
  setThumbDownCnt: (cnt: number | ((prev: number) => number)) => void;
  children?: ReactNode;
};

const ReactThumbUp_v01 = ({
  auth,
  thumbUpCnt,
  setThumbUpCnt,
  thumbDownCnt,
  setThumbDownCnt,
  children,
}: ReactThumbUpPropsType) => {
  const defaultThumbUpStyle: ThumbStyleType = {
    fontSize: defaultThumbConfig.size,
    color: defaultThumbConfig.color.unfilled,
    fill: "",
  };
  const [state, dispatch] = useReducer(thumbupReducer, thumbUpInitialState);
  const thumbUpRef = useRef<HTMLDivElement>(null);
  const thumbDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("useEffect is running");
  }, []);

  const thumbUpAction = () => {
    if (!thumbUpRef.current) return;
    const thumbUpIcon = thumbUpRef.current.querySelector(".thumb-up-icon");
    const thumbUpEcho = thumbUpRef.current.querySelector(
      ".thumbup-echo"
    ) as HTMLElement;
    if (!thumbDownRef || !thumbDownRef.current) return;
    const thumbDownEcho = thumbDownRef.current.querySelector(
      ".thumbup-echo"
    ) as HTMLElement;
    if (state.lastAtion === "THUMB_UP") {
      dispatch({ type: "THUMB_UP_CANCEL" });
      setThumbUpCnt((prev) => prev - 1);
      if (!thumbUpEcho) return;
      echoThumbEcho(thumbUpEcho, "-1");
    } else if (state.lastAtion === "THUMB_DOWN") {
      dispatch({ type: "THUMB_DOWN_CANCEL" });
      setThumbDownCnt((prev) => prev - 1);
      echoThumbEcho(thumbDownEcho, "-1");
    } else {
      dispatch({ type: "THUMB_UP" });
      setThumbUpCnt((prev) => prev + 1);
      if (thumbUpIcon) {
        thumbAnimate(thumbUpIcon as HTMLElement);
      }
      echoThumbEcho(thumbUpEcho as HTMLElement, "+1");
    }
  };
  const thumbDownAction = () => {
    if (!thumbUpRef.current) return;
    const thumbUpEcho = thumbUpRef.current.querySelector(
      ".thumbup-echo"
    ) as HTMLElement;
    if (!thumbDownRef || !thumbDownRef.current) return;
    const thumbDownIcon =
      thumbDownRef.current.querySelector(".thumb-down-icon");
    const thumbDownEcho = thumbDownRef.current.querySelector(
      ".thumbup-echo"
    ) as HTMLElement;
    if (state.lastAtion === "THUMB_DOWN") {
      dispatch({ type: "THUMB_DOWN_CANCEL" });
      setThumbDownCnt((prev) => prev - 1);
      echoThumbEcho(thumbDownEcho, "-1");
    } else if (state.lastAtion === "THUMB_UP") {
      dispatch({ type: "THUMB_UP_CANCEL" });
      setThumbUpCnt((prev) => prev - 1);
      echoThumbEcho(thumbUpEcho, "-1");
    } else {
      dispatch({ type: "THUMB_DOWN" });
      setThumbDownCnt((prev) => prev + 1);
      if (thumbDownIcon) {
        thumbAnimate(thumbDownIcon as HTMLElement);
      }
      echoThumbEcho(thumbDownEcho as HTMLElement, "+1");
    }
  };

  function thumbAnimate(thumbElement: HTMLElement) {
    thumbElement.classList.add("scale");
    setTimeout(() => {
      thumbElement.classList.remove("scale");
    }, 500); // 0.5초 지연 후에 클래스 제거
  }

  function echoThumbEcho(thumbEcho: HTMLElement, str: string) {
    thumbEcho.textContent = str;
    if (str === "-1")
      thumbEcho.style.backgroundColor = "var(--thumbup-minus-color)";
    if (str === "+1")
      thumbEcho.style.backgroundColor = "var(--thumbup-plus-color)";
    thumbEcho.classList.add("first");
    setTimeout(() => {
      thumbEcho.classList.remove("first");
    }, 500); // 0.5초 지연 후에 클래스 제거
  }

  return (
    <>
      <div className="thumbup-container flex flex-container">
        {children && <div className="thumbUp-child">{children}</div>}
        <div className="thumbup-icon-wrapper" ref={thumbUpRef}>
          <PiThumbsUpDuotone
            className={`thumb-up-icon ${auth ? "cursor-pointer " : ""}`}
            key="thumbUp"
            onClick={() => {
              auth ? thumbUpAction() : null;
            }}
            style={{
              ...defaultThumbUpStyle,
              fill:
                thumbUpCnt > 0
                  ? defaultThumbConfig.color.filled
                  : defaultThumbConfig.color.unfilled,
            }}
          />
          <div className="thumb-up-counter   ">{thumbUpCnt}</div>
          <div className="thumbup-echo">+1</div>
        </div>

        <div className="thumbup-icon-wrapper" ref={thumbDownRef}>
          <PiThumbsDownDuotone
            className={`thumb-down-icon ${auth ? "cursor-pointer " : ""}`}
            key="thumbDown"
            onClick={() => {
              auth ? thumbDownAction() : null;
            }}
            style={{
              ...defaultThumbUpStyle,
              fill:
                thumbUpCnt < 0
                  ? defaultThumbConfig.color.filled
                  : defaultThumbConfig.color.unfilled,
            }}
          />
          <div className="thumb-down-counter   ">{thumbDownCnt}</div>
          <div className="thumbup-echo">-1</div>
        </div>
      </div>
    </>
  );
};

export default ReactThumbUp_v01;

// type RunAnimation = {
//   elem: HTMLElement;
//   className: string;
// };
// function runAnimation({ elem, className }: RunAnimation) {
//   if (elem && !elem.classList.contains(className)) {
//     elem.classList.add(className);
//   } else {
//     elem.classList.remove(className);
//     elem.style.width = elem.offsetWidth.toString();
//     elem.classList.add(className);
//   }
// }
