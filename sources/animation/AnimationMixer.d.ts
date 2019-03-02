//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AnimationClip } from './AnimationClip';
import { AnimationAction } from './AnimationAction';
import { EventDispatcher } from './../core/EventDispatcher';

export class AnimationMixer extends EventDispatcher {
  constructor(root: any);

  time: number;
  timeScale: number;

  clipAction(clip: AnimationClip, root?: any): AnimationAction;
  existingAction(clip: AnimationClip, root?: any): AnimationAction;
  stopAllAction(): AnimationMixer;
  update(deltaTime: number): AnimationMixer;
  getRoot(): any;
  uncacheClip(clip: AnimationClip): void;
  uncacheRoot(root: any): void;
  uncacheAction(clip: AnimationClip, root?: any): void;
}
