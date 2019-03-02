//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WARNING: This file was auto-generated, any change will be overridden in next release. Please use configs/es6.conf.js then run "npm run convert". //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { Event } from './Face3';
export class EventDispatcher {
  
  constructor();
  addEventListener(type: string, listener: (event: Event) => void): void;
  hasEventListener(type: string, listener: (event: Event) => void): boolean;
  removeEventListener(type: string, listener: (event: Event) => void): void;
  dispatchEvent(event: { type: string; [attachment: string]: any }): void;
}
