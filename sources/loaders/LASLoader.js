/* eslint-disable */
import {
  FileLoader,
  BufferGeometry,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  DefaultLoadingManager,
} from 'three-full';

import { LASFile, LASDecoder } from './LasLaz';

const LASLoader = (manager) => {
  this.manager = (manager !== undefined) ? manager : DefaultLoadingManager;
  this.littleEndian = true;
};

function positionRescaleHelper(point, header, dim) {
  let index = 0;
  switch (dim) {
    case 'x':
      index = 0;
      break;
    case 'y':
      index = 1;
      break;
    case 'z':
      index = 2;
      break;
    default:
      console.log('wrong argument given to dim argument of positionRescaleHelper in LASLoader');
  }
  return (point[index] * header.scale[index]) + header.offset[index] - header.mins[index];
}

LASLoader.prototype = {

  constructor: LASLoader,

  load: (url, onLoad, onProgress, onError) => {

    const scope = this;

    const loader = new FileLoader(scope.manager);
    loader.setResponseType('arraybuffer');
    loader.load(url, (data) => {
      try {
        onLoad(scope.a.prototype.parse(data, url));
      } catch (e) {
        if (onError) {
          onError(e);
        } else {
          throw e;
        }
      }
    }, onProgress, onError);
  },

  parse: async (buffer, url) => {

    const lf = new LASFile(buffer);
    lf.open();
    const header = await lf.getHeader();
    const textData = await lf.readData(header.pointsCount, header.offset, 0);

    const position = [];

    const lasData = textData.buffer;
    const decoder = new LASDecoder(
      lasData,
      header.pointsFormatId,
      header.pointsStructSize,
      header.pointsCount,
      header.pointsCount,
      header.scale,
      header.offset,
      header.mins,
      header.maxs,
    );

    for (let i = 0, l = header.pointsCount - 1; i < l; i += 1) {
      const point = decoder.getPoint(i).position;
      position.push(positionRescaleHelper(point, header, 'x'));
      position.push(positionRescaleHelper(point, header, 'y'));
      position.push(positionRescaleHelper(point, header, 'z'));
    }

    const geometry = new BufferGeometry();

    if (position.length > 0) {
      geometry.addAttribute(
        'position',
        new Float32BufferAttribute(position, 3),
      );
    }

    geometry.computeBoundingSphere();

    // build material

    const material = new PointsMaterial({ size: 0.1 });

    material.color.setHex(0x0000ff);

    // build mesh

    const mesh = new Points(geometry, material);
    let name = url.split('').reverse().join('');
    name = /([^/]*)/.exec(name);
    name = name[1].split('').reverse().join('');
    mesh.name = name;

    return mesh;
  },
};

export { LASLoader };
