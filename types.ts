export enum GestureType {
  NONE = 'NONE',
  SCROLL_UP = 'SCROLL_UP',
  SCROLL_DOWN = 'SCROLL_DOWN',
  GO_BACK = 'GO_BACK',
  GO_HOME = 'GO_HOME',
  CUSTOM = 'CUSTOM'
}

export interface Landmark {
  x: number;
  y: number;
  z: number;
}

export interface HandLandmarkerResult {
  landmarks: Landmark[][];
  worldLandmarks: Landmark[][];
  handedness: any[];
}