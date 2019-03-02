//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AudioListener } from './AudioListener';
import { Audio } from './Audio';

export class AudioBuffer {
  constructor(context: any);

  context: any;
  ready: boolean;
  readyCallbacks: Function[];

  load(file: string): AudioBuffer;
  onReady(callback: Function): void;
}

export class PositionalAudio extends Audio {
  constructor(listener: AudioListener);

  panner: PannerNode;

  setRefDistance(value: number): void;
  getRefDistance(): number;
  setRolloffFactor(value: number): void;
  getRolloffFactor(): number;
  setDistanceModel(value: number): void;
  getDistanceModel(): number;
  setMaxDistance(value: number): void;
  getMaxDistance(): number;
}
