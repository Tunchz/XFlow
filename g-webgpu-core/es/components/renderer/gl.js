/**
 * WebGL 枚举值
 * @see http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
 * 使用 babel 插件对常量进行内联，以减少最终打包产物大小
 * @see https://github.com/uber/deck.gl/blob/7.1-release/dev-docs/roadmaps/dist-size-roadmap.md#inline-gl-constants
 * 为了支持 WebGPU，新增 TextureUsage
 * @see https://gpuweb.github.io/gpuweb/#gputextureusage
 */
export var gl;

(function (gl) {
  gl[gl["DEPTH_BUFFER_BIT"] = 256] = "DEPTH_BUFFER_BIT";
  gl[gl["STENCIL_BUFFER_BIT"] = 1024] = "STENCIL_BUFFER_BIT";
  gl[gl["COLOR_BUFFER_BIT"] = 16384] = "COLOR_BUFFER_BIT";
  gl[gl["POINTS"] = 0] = "POINTS";
  gl[gl["LINES"] = 1] = "LINES";
  gl[gl["LINE_LOOP"] = 2] = "LINE_LOOP";
  gl[gl["LINE_STRIP"] = 3] = "LINE_STRIP";
  gl[gl["TRIANGLES"] = 4] = "TRIANGLES";
  gl[gl["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
  gl[gl["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
  gl[gl["ZERO"] = 0] = "ZERO";
  gl[gl["ONE"] = 1] = "ONE";
  gl[gl["SRC_COLOR"] = 768] = "SRC_COLOR";
  gl[gl["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
  gl[gl["SRC_ALPHA"] = 770] = "SRC_ALPHA";
  gl[gl["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
  gl[gl["DST_ALPHA"] = 772] = "DST_ALPHA";
  gl[gl["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
  gl[gl["DST_COLOR"] = 774] = "DST_COLOR";
  gl[gl["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
  gl[gl["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
  gl[gl["FUNC_ADD"] = 32774] = "FUNC_ADD";
  gl[gl["BLEND_EQUATION"] = 32777] = "BLEND_EQUATION";
  gl[gl["BLEND_EQUATION_RGB"] = 32777] = "BLEND_EQUATION_RGB";
  gl[gl["BLEND_EQUATION_ALPHA"] = 34877] = "BLEND_EQUATION_ALPHA";
  gl[gl["FUNC_SUBTRACT"] = 32778] = "FUNC_SUBTRACT";
  gl[gl["FUNC_REVERSE_SUBTRACT"] = 32779] = "FUNC_REVERSE_SUBTRACT";
  gl[gl["MAX_EXT"] = 32776] = "MAX_EXT";
  gl[gl["MIN_EXT"] = 32775] = "MIN_EXT";
  gl[gl["BLEND_DST_RGB"] = 32968] = "BLEND_DST_RGB";
  gl[gl["BLEND_SRC_RGB"] = 32969] = "BLEND_SRC_RGB";
  gl[gl["BLEND_DST_ALPHA"] = 32970] = "BLEND_DST_ALPHA";
  gl[gl["BLEND_SRC_ALPHA"] = 32971] = "BLEND_SRC_ALPHA";
  gl[gl["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
  gl[gl["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
  gl[gl["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
  gl[gl["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
  gl[gl["BLEND_COLOR"] = 32773] = "BLEND_COLOR";
  gl[gl["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
  gl[gl["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
  gl[gl["ARRAY_BUFFER_BINDING"] = 34964] = "ARRAY_BUFFER_BINDING";
  gl[gl["ELEMENT_ARRAY_BUFFER_BINDING"] = 34965] = "ELEMENT_ARRAY_BUFFER_BINDING";
  gl[gl["STREAM_DRAW"] = 35040] = "STREAM_DRAW";
  gl[gl["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
  gl[gl["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW";
  gl[gl["BUFFER_SIZE"] = 34660] = "BUFFER_SIZE";
  gl[gl["BUFFER_USAGE"] = 34661] = "BUFFER_USAGE";
  gl[gl["CURRENT_VERTEX_ATTRIB"] = 34342] = "CURRENT_VERTEX_ATTRIB";
  gl[gl["FRONT"] = 1028] = "FRONT";
  gl[gl["BACK"] = 1029] = "BACK";
  gl[gl["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
  gl[gl["CULL_FACE"] = 2884] = "CULL_FACE";
  gl[gl["BLEND"] = 3042] = "BLEND";
  gl[gl["DITHER"] = 3024] = "DITHER";
  gl[gl["STENCIL_TEST"] = 2960] = "STENCIL_TEST";
  gl[gl["DEPTH_TEST"] = 2929] = "DEPTH_TEST";
  gl[gl["SCISSOR_TEST"] = 3089] = "SCISSOR_TEST";
  gl[gl["POLYGON_OFFSET_FILL"] = 32823] = "POLYGON_OFFSET_FILL";
  gl[gl["SAMPLE_ALPHA_TO_COVERAGE"] = 32926] = "SAMPLE_ALPHA_TO_COVERAGE";
  gl[gl["SAMPLE_COVERAGE"] = 32928] = "SAMPLE_COVERAGE";
  gl[gl["NO_ERROR"] = 0] = "NO_ERROR";
  gl[gl["INVALID_ENUM"] = 1280] = "INVALID_ENUM";
  gl[gl["INVALID_VALUE"] = 1281] = "INVALID_VALUE";
  gl[gl["INVALID_OPERATION"] = 1282] = "INVALID_OPERATION";
  gl[gl["OUT_OF_MEMORY"] = 1285] = "OUT_OF_MEMORY";
  gl[gl["CW"] = 2304] = "CW";
  gl[gl["CCW"] = 2305] = "CCW";
  gl[gl["LINE_WIDTH"] = 2849] = "LINE_WIDTH";
  gl[gl["ALIASED_POINT_SIZE_RANGE"] = 33901] = "ALIASED_POINT_SIZE_RANGE";
  gl[gl["ALIASED_LINE_WIDTH_RANGE"] = 33902] = "ALIASED_LINE_WIDTH_RANGE";
  gl[gl["CULL_FACE_MODE"] = 2885] = "CULL_FACE_MODE";
  gl[gl["FRONT_FACE"] = 2886] = "FRONT_FACE";
  gl[gl["DEPTH_RANGE"] = 2928] = "DEPTH_RANGE";
  gl[gl["DEPTH_WRITEMASK"] = 2930] = "DEPTH_WRITEMASK";
  gl[gl["DEPTH_CLEAR_VALUE"] = 2931] = "DEPTH_CLEAR_VALUE";
  gl[gl["DEPTH_FUNC"] = 2932] = "DEPTH_FUNC";
  gl[gl["STENCIL_CLEAR_VALUE"] = 2961] = "STENCIL_CLEAR_VALUE";
  gl[gl["STENCIL_FUNC"] = 2962] = "STENCIL_FUNC";
  gl[gl["STENCIL_FAIL"] = 2964] = "STENCIL_FAIL";
  gl[gl["STENCIL_PASS_DEPTH_FAIL"] = 2965] = "STENCIL_PASS_DEPTH_FAIL";
  gl[gl["STENCIL_PASS_DEPTH_PASS"] = 2966] = "STENCIL_PASS_DEPTH_PASS";
  gl[gl["STENCIL_REF"] = 2967] = "STENCIL_REF";
  gl[gl["STENCIL_VALUE_MASK"] = 2963] = "STENCIL_VALUE_MASK";
  gl[gl["STENCIL_WRITEMASK"] = 2968] = "STENCIL_WRITEMASK";
  gl[gl["STENCIL_BACK_FUNC"] = 34816] = "STENCIL_BACK_FUNC";
  gl[gl["STENCIL_BACK_FAIL"] = 34817] = "STENCIL_BACK_FAIL";
  gl[gl["STENCIL_BACK_PASS_DEPTH_FAIL"] = 34818] = "STENCIL_BACK_PASS_DEPTH_FAIL";
  gl[gl["STENCIL_BACK_PASS_DEPTH_PASS"] = 34819] = "STENCIL_BACK_PASS_DEPTH_PASS";
  gl[gl["STENCIL_BACK_REF"] = 36003] = "STENCIL_BACK_REF";
  gl[gl["STENCIL_BACK_VALUE_MASK"] = 36004] = "STENCIL_BACK_VALUE_MASK";
  gl[gl["STENCIL_BACK_WRITEMASK"] = 36005] = "STENCIL_BACK_WRITEMASK";
  gl[gl["VIEWPORT"] = 2978] = "VIEWPORT";
  gl[gl["SCISSOR_BOX"] = 3088] = "SCISSOR_BOX";
  gl[gl["COLOR_CLEAR_VALUE"] = 3106] = "COLOR_CLEAR_VALUE";
  gl[gl["COLOR_WRITEMASK"] = 3107] = "COLOR_WRITEMASK";
  gl[gl["UNPACK_ALIGNMENT"] = 3317] = "UNPACK_ALIGNMENT";
  gl[gl["PACK_ALIGNMENT"] = 3333] = "PACK_ALIGNMENT";
  gl[gl["MAX_TEXTURE_SIZE"] = 3379] = "MAX_TEXTURE_SIZE";
  gl[gl["MAX_VIEWPORT_DIMS"] = 3386] = "MAX_VIEWPORT_DIMS";
  gl[gl["SUBPIXEL_BITS"] = 3408] = "SUBPIXEL_BITS";
  gl[gl["RED_BITS"] = 3410] = "RED_BITS";
  gl[gl["GREEN_BITS"] = 3411] = "GREEN_BITS";
  gl[gl["BLUE_BITS"] = 3412] = "BLUE_BITS";
  gl[gl["ALPHA_BITS"] = 3413] = "ALPHA_BITS";
  gl[gl["DEPTH_BITS"] = 3414] = "DEPTH_BITS";
  gl[gl["STENCIL_BITS"] = 3415] = "STENCIL_BITS";
  gl[gl["POLYGON_OFFSET_UNITS"] = 10752] = "POLYGON_OFFSET_UNITS";
  gl[gl["POLYGON_OFFSET_FACTOR"] = 32824] = "POLYGON_OFFSET_FACTOR";
  gl[gl["TEXTURE_BINDING_2D"] = 32873] = "TEXTURE_BINDING_2D";
  gl[gl["SAMPLE_BUFFERS"] = 32936] = "SAMPLE_BUFFERS";
  gl[gl["SAMPLES"] = 32937] = "SAMPLES";
  gl[gl["SAMPLE_COVERAGE_VALUE"] = 32938] = "SAMPLE_COVERAGE_VALUE";
  gl[gl["SAMPLE_COVERAGE_INVERT"] = 32939] = "SAMPLE_COVERAGE_INVERT";
  gl[gl["COMPRESSED_TEXTURE_FORMATS"] = 34467] = "COMPRESSED_TEXTURE_FORMATS";
  gl[gl["DONT_CARE"] = 4352] = "DONT_CARE";
  gl[gl["FASTEST"] = 4353] = "FASTEST";
  gl[gl["NICEST"] = 4354] = "NICEST";
  gl[gl["GENERATE_MIPMAP_HINT"] = 33170] = "GENERATE_MIPMAP_HINT";
  gl[gl["BYTE"] = 5120] = "BYTE";
  gl[gl["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
  gl[gl["SHORT"] = 5122] = "SHORT";
  gl[gl["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
  gl[gl["INT"] = 5124] = "INT";
  gl[gl["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
  gl[gl["FLOAT"] = 5126] = "FLOAT";
  gl[gl["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
  gl[gl["ALPHA"] = 6406] = "ALPHA";
  gl[gl["RGB"] = 6407] = "RGB";
  gl[gl["RGBA"] = 6408] = "RGBA";
  gl[gl["LUMINANCE"] = 6409] = "LUMINANCE";
  gl[gl["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
  gl[gl["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
  gl[gl["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
  gl[gl["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
  gl[gl["FRAGMENT_SHADER"] = 35632] = "FRAGMENT_SHADER";
  gl[gl["VERTEX_SHADER"] = 35633] = "VERTEX_SHADER";
  gl[gl["MAX_VERTEX_ATTRIBS"] = 34921] = "MAX_VERTEX_ATTRIBS";
  gl[gl["MAX_VERTEX_UNIFORM_VECTORS"] = 36347] = "MAX_VERTEX_UNIFORM_VECTORS";
  gl[gl["MAX_VARYING_VECTORS"] = 36348] = "MAX_VARYING_VECTORS";
  gl[gl["MAX_COMBINED_TEXTURE_IMAGE_UNITS"] = 35661] = "MAX_COMBINED_TEXTURE_IMAGE_UNITS";
  gl[gl["MAX_VERTEX_TEXTURE_IMAGE_UNITS"] = 35660] = "MAX_VERTEX_TEXTURE_IMAGE_UNITS";
  gl[gl["MAX_TEXTURE_IMAGE_UNITS"] = 34930] = "MAX_TEXTURE_IMAGE_UNITS";
  gl[gl["MAX_FRAGMENT_UNIFORM_VECTORS"] = 36349] = "MAX_FRAGMENT_UNIFORM_VECTORS";
  gl[gl["SHADER_TYPE"] = 35663] = "SHADER_TYPE";
  gl[gl["DELETE_STATUS"] = 35712] = "DELETE_STATUS";
  gl[gl["LINK_STATUS"] = 35714] = "LINK_STATUS";
  gl[gl["VALIDATE_STATUS"] = 35715] = "VALIDATE_STATUS";
  gl[gl["ATTACHED_SHADERS"] = 35717] = "ATTACHED_SHADERS";
  gl[gl["ACTIVE_UNIFORMS"] = 35718] = "ACTIVE_UNIFORMS";
  gl[gl["ACTIVE_ATTRIBUTES"] = 35721] = "ACTIVE_ATTRIBUTES";
  gl[gl["SHADING_LANGUAGE_VERSION"] = 35724] = "SHADING_LANGUAGE_VERSION";
  gl[gl["CURRENT_PROGRAM"] = 35725] = "CURRENT_PROGRAM";
  gl[gl["NEVER"] = 512] = "NEVER";
  gl[gl["LESS"] = 513] = "LESS";
  gl[gl["EQUAL"] = 514] = "EQUAL";
  gl[gl["LEQUAL"] = 515] = "LEQUAL";
  gl[gl["GREATER"] = 516] = "GREATER";
  gl[gl["NOTEQUAL"] = 517] = "NOTEQUAL";
  gl[gl["GEQUAL"] = 518] = "GEQUAL";
  gl[gl["ALWAYS"] = 519] = "ALWAYS";
  gl[gl["KEEP"] = 7680] = "KEEP";
  gl[gl["REPLACE"] = 7681] = "REPLACE";
  gl[gl["INCR"] = 7682] = "INCR";
  gl[gl["DECR"] = 7683] = "DECR";
  gl[gl["INVERT"] = 5386] = "INVERT";
  gl[gl["INCR_WRAP"] = 34055] = "INCR_WRAP";
  gl[gl["DECR_WRAP"] = 34056] = "DECR_WRAP";
  gl[gl["VENDOR"] = 7936] = "VENDOR";
  gl[gl["RENDERER"] = 7937] = "RENDERER";
  gl[gl["VERSION"] = 7938] = "VERSION";
  gl[gl["NEAREST"] = 9728] = "NEAREST";
  gl[gl["LINEAR"] = 9729] = "LINEAR";
  gl[gl["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
  gl[gl["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
  gl[gl["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
  gl[gl["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
  gl[gl["TEXTURE_MAG_FILTER"] = 10240] = "TEXTURE_MAG_FILTER";
  gl[gl["TEXTURE_MIN_FILTER"] = 10241] = "TEXTURE_MIN_FILTER";
  gl[gl["TEXTURE_WRAP_S"] = 10242] = "TEXTURE_WRAP_S";
  gl[gl["TEXTURE_WRAP_T"] = 10243] = "TEXTURE_WRAP_T";
  gl[gl["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
  gl[gl["TEXTURE"] = 5890] = "TEXTURE";
  gl[gl["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
  gl[gl["TEXTURE_BINDING_CUBE_MAP"] = 34068] = "TEXTURE_BINDING_CUBE_MAP";
  gl[gl["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
  gl[gl["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
  gl[gl["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
  gl[gl["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
  gl[gl["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
  gl[gl["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
  gl[gl["MAX_CUBE_MAP_TEXTURE_SIZE"] = 34076] = "MAX_CUBE_MAP_TEXTURE_SIZE";
  gl[gl["TEXTURE0"] = 33984] = "TEXTURE0";
  gl[gl["TEXTURE1"] = 33985] = "TEXTURE1";
  gl[gl["TEXTURE2"] = 33986] = "TEXTURE2";
  gl[gl["TEXTURE3"] = 33987] = "TEXTURE3";
  gl[gl["TEXTURE4"] = 33988] = "TEXTURE4";
  gl[gl["TEXTURE5"] = 33989] = "TEXTURE5";
  gl[gl["TEXTURE6"] = 33990] = "TEXTURE6";
  gl[gl["TEXTURE7"] = 33991] = "TEXTURE7";
  gl[gl["TEXTURE8"] = 33992] = "TEXTURE8";
  gl[gl["TEXTURE9"] = 33993] = "TEXTURE9";
  gl[gl["TEXTURE10"] = 33994] = "TEXTURE10";
  gl[gl["TEXTURE11"] = 33995] = "TEXTURE11";
  gl[gl["TEXTURE12"] = 33996] = "TEXTURE12";
  gl[gl["TEXTURE13"] = 33997] = "TEXTURE13";
  gl[gl["TEXTURE14"] = 33998] = "TEXTURE14";
  gl[gl["TEXTURE15"] = 33999] = "TEXTURE15";
  gl[gl["TEXTURE16"] = 34000] = "TEXTURE16";
  gl[gl["TEXTURE17"] = 34001] = "TEXTURE17";
  gl[gl["TEXTURE18"] = 34002] = "TEXTURE18";
  gl[gl["TEXTURE19"] = 34003] = "TEXTURE19";
  gl[gl["TEXTURE20"] = 34004] = "TEXTURE20";
  gl[gl["TEXTURE21"] = 34005] = "TEXTURE21";
  gl[gl["TEXTURE22"] = 34006] = "TEXTURE22";
  gl[gl["TEXTURE23"] = 34007] = "TEXTURE23";
  gl[gl["TEXTURE24"] = 34008] = "TEXTURE24";
  gl[gl["TEXTURE25"] = 34009] = "TEXTURE25";
  gl[gl["TEXTURE26"] = 34010] = "TEXTURE26";
  gl[gl["TEXTURE27"] = 34011] = "TEXTURE27";
  gl[gl["TEXTURE28"] = 34012] = "TEXTURE28";
  gl[gl["TEXTURE29"] = 34013] = "TEXTURE29";
  gl[gl["TEXTURE30"] = 34014] = "TEXTURE30";
  gl[gl["TEXTURE31"] = 34015] = "TEXTURE31";
  gl[gl["ACTIVE_TEXTURE"] = 34016] = "ACTIVE_TEXTURE";
  gl[gl["REPEAT"] = 10497] = "REPEAT";
  gl[gl["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
  gl[gl["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
  gl[gl["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
  gl[gl["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
  gl[gl["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
  gl[gl["INT_VEC2"] = 35667] = "INT_VEC2";
  gl[gl["INT_VEC3"] = 35668] = "INT_VEC3";
  gl[gl["INT_VEC4"] = 35669] = "INT_VEC4";
  gl[gl["BOOL"] = 35670] = "BOOL";
  gl[gl["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
  gl[gl["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
  gl[gl["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
  gl[gl["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
  gl[gl["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
  gl[gl["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
  gl[gl["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
  gl[gl["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
  gl[gl["VERTEX_ATTRIB_ARRAY_ENABLED"] = 34338] = "VERTEX_ATTRIB_ARRAY_ENABLED";
  gl[gl["VERTEX_ATTRIB_ARRAY_SIZE"] = 34339] = "VERTEX_ATTRIB_ARRAY_SIZE";
  gl[gl["VERTEX_ATTRIB_ARRAY_STRIDE"] = 34340] = "VERTEX_ATTRIB_ARRAY_STRIDE";
  gl[gl["VERTEX_ATTRIB_ARRAY_TYPE"] = 34341] = "VERTEX_ATTRIB_ARRAY_TYPE";
  gl[gl["VERTEX_ATTRIB_ARRAY_NORMALIZED"] = 34922] = "VERTEX_ATTRIB_ARRAY_NORMALIZED";
  gl[gl["VERTEX_ATTRIB_ARRAY_POINTER"] = 34373] = "VERTEX_ATTRIB_ARRAY_POINTER";
  gl[gl["VERTEX_ATTRIB_ARRAY_BUFFER_BINDING"] = 34975] = "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING";
  gl[gl["COMPILE_STATUS"] = 35713] = "COMPILE_STATUS";
  gl[gl["LOW_FLOAT"] = 36336] = "LOW_FLOAT";
  gl[gl["MEDIUM_FLOAT"] = 36337] = "MEDIUM_FLOAT";
  gl[gl["HIGH_FLOAT"] = 36338] = "HIGH_FLOAT";
  gl[gl["LOW_INT"] = 36339] = "LOW_INT";
  gl[gl["MEDIUM_INT"] = 36340] = "MEDIUM_INT";
  gl[gl["HIGH_INT"] = 36341] = "HIGH_INT";
  gl[gl["FRAMEBUFFER"] = 36160] = "FRAMEBUFFER";
  gl[gl["RENDERBUFFER"] = 36161] = "RENDERBUFFER";
  gl[gl["RGBA4"] = 32854] = "RGBA4";
  gl[gl["RGB5_A1"] = 32855] = "RGB5_A1";
  gl[gl["RGB565"] = 36194] = "RGB565";
  gl[gl["DEPTH_COMPONENT16"] = 33189] = "DEPTH_COMPONENT16";
  gl[gl["STENCIL_INDEX"] = 6401] = "STENCIL_INDEX";
  gl[gl["STENCIL_INDEX8"] = 36168] = "STENCIL_INDEX8";
  gl[gl["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
  gl[gl["RENDERBUFFER_WIDTH"] = 36162] = "RENDERBUFFER_WIDTH";
  gl[gl["RENDERBUFFER_HEIGHT"] = 36163] = "RENDERBUFFER_HEIGHT";
  gl[gl["RENDERBUFFER_INTERNAL_FORMAT"] = 36164] = "RENDERBUFFER_INTERNAL_FORMAT";
  gl[gl["RENDERBUFFER_RED_SIZE"] = 36176] = "RENDERBUFFER_RED_SIZE";
  gl[gl["RENDERBUFFER_GREEN_SIZE"] = 36177] = "RENDERBUFFER_GREEN_SIZE";
  gl[gl["RENDERBUFFER_BLUE_SIZE"] = 36178] = "RENDERBUFFER_BLUE_SIZE";
  gl[gl["RENDERBUFFER_ALPHA_SIZE"] = 36179] = "RENDERBUFFER_ALPHA_SIZE";
  gl[gl["RENDERBUFFER_DEPTH_SIZE"] = 36180] = "RENDERBUFFER_DEPTH_SIZE";
  gl[gl["RENDERBUFFER_STENCIL_SIZE"] = 36181] = "RENDERBUFFER_STENCIL_SIZE";
  gl[gl["FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE"] = 36048] = "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE";
  gl[gl["FRAMEBUFFER_ATTACHMENT_OBJECT_NAME"] = 36049] = "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME";
  gl[gl["FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL"] = 36050] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL";
  gl[gl["FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE"] = 36051] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE";
  gl[gl["COLOR_ATTACHMENT0"] = 36064] = "COLOR_ATTACHMENT0";
  gl[gl["DEPTH_ATTACHMENT"] = 36096] = "DEPTH_ATTACHMENT";
  gl[gl["STENCIL_ATTACHMENT"] = 36128] = "STENCIL_ATTACHMENT";
  gl[gl["DEPTH_STENCIL_ATTACHMENT"] = 33306] = "DEPTH_STENCIL_ATTACHMENT";
  gl[gl["NONE"] = 0] = "NONE";
  gl[gl["FRAMEBUFFER_COMPLETE"] = 36053] = "FRAMEBUFFER_COMPLETE";
  gl[gl["FRAMEBUFFER_INCOMPLETE_ATTACHMENT"] = 36054] = "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
  gl[gl["FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"] = 36055] = "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
  gl[gl["FRAMEBUFFER_INCOMPLETE_DIMENSIONS"] = 36057] = "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
  gl[gl["FRAMEBUFFER_UNSUPPORTED"] = 36061] = "FRAMEBUFFER_UNSUPPORTED";
  gl[gl["FRAMEBUFFER_BINDING"] = 36006] = "FRAMEBUFFER_BINDING";
  gl[gl["RENDERBUFFER_BINDING"] = 36007] = "RENDERBUFFER_BINDING";
  gl[gl["MAX_RENDERBUFFER_SIZE"] = 34024] = "MAX_RENDERBUFFER_SIZE";
  gl[gl["INVALID_FRAMEBUFFER_OPERATION"] = 1286] = "INVALID_FRAMEBUFFER_OPERATION";
  gl[gl["UNPACK_FLIP_Y_WEBGL"] = 37440] = "UNPACK_FLIP_Y_WEBGL";
  gl[gl["UNPACK_PREMULTIPLY_ALPHA_WEBGL"] = 37441] = "UNPACK_PREMULTIPLY_ALPHA_WEBGL";
  gl[gl["CONTEXT_LOST_WEBGL"] = 37442] = "CONTEXT_LOST_WEBGL";
  gl[gl["UNPACK_COLORSPACE_CONVERSION_WEBGL"] = 37443] = "UNPACK_COLORSPACE_CONVERSION_WEBGL";
  gl[gl["BROWSER_DEFAULT_WEBGL"] = 37444] = "BROWSER_DEFAULT_WEBGL";
  gl[gl["COPY_SRC"] = 1] = "COPY_SRC";
  gl[gl["COPY_DST"] = 2] = "COPY_DST";
  gl[gl["SAMPLED"] = 4] = "SAMPLED";
  gl[gl["STORAGE"] = 8] = "STORAGE";
  gl[gl["RENDER_ATTACHMENT"] = 16] = "RENDER_ATTACHMENT";
})(gl || (gl = {}));
//# sourceMappingURL=gl.js.map