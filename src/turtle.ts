import {vec3} from 'gl-matrix';
import {setGL} from './globals';
import {Blob, generate_mesh} from './geometry/Blob';

function gen_circle(x, y): any  {
  let v_angle = y * Math.PI;    
  let h_angle = x * 2.0 * Math.PI;
  return [
    Math.sin(v_angle) * Math.cos(h_angle),
    Math.sin(v_angle) * Math.sin(h_angle),
    Math.cos(v_angle)]
}

function gen_ground(x, y): any {
  return [
    (x - 0.5) * 20.0,
    0,
    (y - 0.5) * 20.0
  ]
}

function create_ground() {
  let res = generate_mesh(2, 2, gen_ground);
  let seg = new Blob(...res);
  seg.create();

  let offsets = new Float32Array([
    0,0,0,
  ]);
  let rotations = new Float32Array([
    1,0,0,0,
  ]);
  let scales = new Float32Array([
    1,1,1,
  ]);
  let colors = new Float32Array([
    0,1,0,1,
  ]);
  seg.setInstanceVBOs(offsets, rotations, scales, colors);
  seg.setNumInstances(1);
  return seg;
}

function create_seg() {
  let circle_res = generate_mesh(10, 10, gen_circle);
  let seg = new Blob(...circle_res);
  seg.create();

  let offsets = new Float32Array([
    0,0,0,
    4,0,0,
    0,0,6
  ]);
  let rotations = new Float32Array([
    1,0,0,0,
    1,0,0,0,
    0,1,0,Math.PI/4
  ]);
  let scales = new Float32Array([
    1,1,1,
    2,2,2,
    6,1,1
  ]);
  let colors = new Float32Array([
    1,0,0,1,
    0,1,0,1,
    0,0,1,1
  ]);
  seg.setInstanceVBOs(offsets, rotations, scales, colors);
  seg.setNumInstances(3);
  return seg;
}

// returns a list of drawables to render with the instanced shader
export function generate_scene() {
  let drawables = [];
  let ground = create_ground();
  let seg = create_seg();  

  drawables.push(ground);
  drawables.push(seg);

  return drawables;
}
