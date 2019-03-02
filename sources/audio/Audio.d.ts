//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Object3D } from './../core/Object3D';
import { AudioListener } from './AudioListener';
import { AudioContext } from './AudioContext';

// Extras / Audio /////////////////////////////////////////////////////////////////////

export class Audio extends Object3D {
  constructor(listener: AudioListener);
  type: 'Audio';

  context: AudioContext;
  gain: GainNode;
  autoplay: boolean;
  buffer: null | Audio;
  loop: boolean;
  startTime: number;
  offset: number;
  playbackRate: number;
  isPlaying: boolean;
  hasPlaybackControl: boolean;
  sourceType: string;
  source: AudioBufferSourceNode;
  filters: any[];

  getOutput(): GainNode;
  setNodeSource(audioNode: AudioBufferSourceNode): this;
  setMediaElementSource(mediaElement: MediaElementAudioSourceNode): this;
  setBuffer(audioBuffer: AudioBuffer): this;
  play(): this;
  onEnded(): void;
  pause(): this;
  stop(): this;
  connect(): this;
  disconnect(): this;
  getFilters(): any[];
  setFilter(value: any[]): this;
  getFilter(): any;
  setFilter(filter: any): this;
  setPlaybackRate(value: number): this;
  getPlaybackRate(): number;
  getLoop(): boolean;
  setLoop(value: boolean): void;
  getVolume(): number;
  setVolume(value: number): this;
  
  load(file: string): Audio;
}
