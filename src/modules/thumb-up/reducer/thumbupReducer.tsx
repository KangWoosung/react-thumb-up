/*  2024-03-27 23:48:01



*/

import { ThumbUpInitialStateType } from "../ReactThumbUp_v01";

type ThumbupAction = {
  type: "THUMB_UP" | "THUMB_DOWN" | "THUMB_UP_CANCEL" | "THUMB_DOWN_CANCEL";
};

export function thumbupReducer(
  state: ThumbUpInitialStateType,
  action: ThumbupAction
) {
  console.log("thumbupReducer is running");
  const { type } = action;
  switch (type) {
    case "THUMB_UP":
      return {
        ...state,
        thumbUpCnt: state.thumbUpCnt + 1,
        thumbUpActioned: true,
        thumbDownActioned: false,
        lastAtion: "THUMB_UP",
      };
    case "THUMB_DOWN":
      return {
        ...state,
        thumbDownCnt: state.thumbDownCnt + 1,
        thumbUpActioned: false,
        thumbDownActioned: true,
        lastAtion: "THUMB_DOWN",
      };
    case "THUMB_UP_CANCEL":
      return {
        ...state,
        thumbUpCnt: state.thumbUpCnt - 1,
        thumbUpActioned: false,
        thumbDownActioned: false,
        lastAtion: "",
      };
    case "THUMB_DOWN_CANCEL":
      return {
        ...state,
        thumbDownCnt: state.thumbDownCnt - 1,
        thumbUpActioned: false,
        thumbDownActioned: false,
        lastAtion: "",
      };
    default:
      return state;
  }
}
