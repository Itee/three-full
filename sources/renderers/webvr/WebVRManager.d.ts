//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from '../../core/Object3D';
import { PerspectiveCamera } from '../../cameras/PerspectiveCamera';
import { ArrayCamera } from '../../cameras/ArrayCamera';

export interface WebVRManager {
  enabled: boolean;
  getDevice(): VRDisplay | null;
  setDevice(device: VRDisplay | null): void;
  setPoseTarget(object: Object3D | null): void;
  getCamera(camera: PerspectiveCamera): PerspectiveCamera | ArrayCamera;
  submitFrame(): void;
  dispose(): void;
}
