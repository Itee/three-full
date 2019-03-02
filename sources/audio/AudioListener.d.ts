//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../core/Object3D';
import { AudioContext } from './AudioContext';

export class AudioListener extends Object3D {
  constructor();

  type: 'AudioListener';
  context: AudioContext;
  gain: GainNode;
  filter: null | any;

  getInput(): GainNode;
  removeFilter(): void;
  setFilter(value: any): void;
  getFilter(): any;
  setMasterVolume(value: number): void;
  getMasterVolume(): number;
  updateMatrixWorld(force?: boolean): void;
}
