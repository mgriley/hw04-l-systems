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

// returns a list of drawables to render with the instanced shader
export function generate_scene() {
  let circle_res = generate_mesh(10, 10, gen_circle);
  let blob = new Blob(...circle_res);
  blob.create();

  let offsets = new Float32Array([0,0,0]);
  let rotations = new Float32Array([1,0,0,0]);
  let scales = new Float32Array([1,1,1]);
  let colors = new Float32Array([1,0,0,1]);
  blob.setInstanceVBOs(offsets, rotations, scales, colors);
  blob.setNumInstances(1);

  return [blob];
}
