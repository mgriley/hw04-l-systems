#version 300 es
precision highp float;

in vec4 fs_Col;
in vec4 fs_Pos;
in vec3 fs_Nor;

out vec4 out_Col;

void main()
{
  vec3 light_dir = normalize(vec3(1,1,-0.75));
  float df = clamp(dot(fs_Nor.xyz, light_dir), 0.0, 1.0);
  vec3 col = df * fs_Col.rgb;

  //col = fs_Nor.xyz;

  out_Col = vec4(col,1.0);
}

