import { Frustum, ICamera, IInteractorService } from '@tunchz/xflow/g-webgpu-core';
import { mat4, vec3 } from 'gl-matrix';
import Landmark from './Landmark';
export declare enum CAMERA_TYPE {
    ORBITING = "ORBITING",
    EXPLORING = "EXPLORING",
    TRACKING = "TRACKING"
}
export declare enum CAMERA_TRACKING_MODE {
    DEFAULT = "DEFAULT",
    ROTATIONAL = "ROTATIONAL",
    TRANSLATIONAL = "TRANSLATIONAL",
    CINEMATIC = "CINEMATIC"
}
export declare enum CAMERA_PROJECTION_MODE {
    ORTHOGRAPHIC = "ORTHOGRAPHIC",
    PERSPECTIVE = "PERSPECTIVE"
}
/**
 * 参考「WebGL Insights - 23.Designing Cameras for WebGL Applications」，基于 Responsible Camera 思路设计
 * 保存相机参数，定义相机动作：
 * 1. dolly 沿 n 轴移动
 * 2. pan 沿 u v 轴移动
 * 3. rotate 以方位角旋转
 * 4. 移动到 Landmark，具有平滑的动画效果，其间禁止其他用户交互
 */
export declare class Camera implements ICamera {
    static ProjectionMode: {
        ORTHOGRAPHIC: string;
        PERSPECTIVE: string;
    };
    /**
     * 相机矩阵
     */
    matrix: mat4;
    /**
     * u 轴
     * @see http://learnwebgl.brown37.net/07_cameras/camera_introduction.html#a-camera-definition
     */
    right: vec3;
    /**
     * v 轴
     */
    up: vec3;
    /**
     * n 轴
     */
    forward: vec3;
    /**
     * 相机位置
     */
    position: vec3;
    /**
     * 视点位置
     */
    focalPoint: vec3;
    /**
     * 相机位置到视点向量
     * focalPoint - position
     */
    distanceVector: vec3;
    /**
     * 相机位置到视点距离
     * length(focalPoint - position)
     */
    distance: number;
    /**
     * @see https://en.wikipedia.org/wiki/Azimuth
     */
    azimuth: number;
    elevation: number;
    roll: number;
    relAzimuth: number;
    relElevation: number;
    relRoll: number;
    /**
     * 沿 n 轴移动时，保证移动速度从快到慢
     */
    dollyingStep: number;
    maxDistance: number;
    minDistance: number;
    /**
     * invert the horizontal coordinate system HCS
     */
    rotateWorld: boolean;
    interactor: IInteractorService;
    /**
     * 投影矩阵参数
     */
    /**
     * field of view [0-360]
     * @see http://en.wikipedia.org/wiki/Angle_of_view
     */
    private fov;
    private near;
    private far;
    private aspect;
    private left;
    private rright;
    private top;
    private bottom;
    private zoom;
    private perspective;
    private view;
    private following;
    private type;
    private trackingMode;
    private projectionMode;
    /**
     * for culling use
     */
    private frustum;
    /**
     * switch between multiple landmarks
     */
    private landmarks;
    private landmarkAnimationID;
    clone(): Camera;
    getProjectionMode(): CAMERA_PROJECTION_MODE;
    getPerspective(): mat4;
    getFrustum(): Frustum;
    getPosition(): vec3;
    setType(type: CAMERA_TYPE, trackingMode: CAMERA_TRACKING_MODE | undefined): this;
    setProjectionMode(projectionMode: CAMERA_PROJECTION_MODE): this;
    setTrackingMode(trackingMode: CAMERA_TRACKING_MODE): this;
    /**
     * If flag is true, it reverses the azimuth and elevation angles.
     * Subsequent calls to rotate, setAzimuth, setElevation,
     * changeAzimuth or changeElevation will cause the inverted effect.
     * setRoll or changeRoll is not affected by this method.
     *
     * This inversion is useful when one wants to simulate that the world
     * is moving, instead of the camera.
     *
     * By default the camera angles are not reversed.
     * @param {Boolean} flag the boolean flag to reverse the angles.
     */
    setWorldRotation(flag: boolean): void;
    /**
     * 计算 MV 矩阵，为相机矩阵的逆矩阵
     */
    getViewTransform(): mat4;
    getWorldTransform(): mat4;
    /**
     * 设置相机矩阵
     */
    setMatrix(matrix: mat4): this;
    setAspect(aspect: number): this;
    /**
     * Sets an offset in a larger frustum, used in PixelPicking
     */
    setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): this;
    clearViewOffset(): this;
    setPerspective(near: number, far: number, fov: number, aspect: number): this;
    setOrthographic(l: number, r: number, t: number, b: number, near: number, far: number): this;
    /**
     * 设置相机位置
     */
    setPosition(x: number | vec3, y?: number, z?: number): this;
    /**
     * 设置视点位置
     */
    setFocalPoint(x: number | vec3, y?: number, z?: number): this;
    /**
     * 固定当前视点，按指定距离放置相机
     */
    setDistance(d: number): this | undefined;
    setMaxDistance(d: number): this;
    setMinDistance(d: number): this;
    /**
     * Changes the initial azimuth of the camera
     */
    changeAzimuth(az: number): this;
    /**
     * Changes the initial elevation of the camera
     */
    changeElevation(el: number): this;
    /**
     * Changes the initial roll of the camera
     */
    changeRoll(rl: number): this;
    /**
     * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
     * @param {Number} el the azimuth in degrees
     */
    setAzimuth(az: number): this;
    getAzimuth(): number;
    /**
     * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
     * @param {Number} el the elevation in degrees
     */
    setElevation(el: number): this;
    /**
     * 设置相机方位角，不同相机模式下需要重新计算相机位置或者是视点位置
     * @param {Number} angle the roll angle
     */
    setRoll(angle: number): this;
    /**
     * Changes the azimuth and elevation with respect to the current camera axes
     * @param {Number} azimuth the relative azimuth
     * @param {Number} elevation the relative elevation
     * @param {Number} roll the relative roll
     */
    rotate(azimuth: number, elevation: number, roll: number): this | undefined;
    /**
     * 沿水平(right) & 垂直(up)平移相机
     */
    pan(tx: number, ty: number): this;
    /**
     * 沿 n 轴移动，当距离视点远时移动速度较快，离视点越近速度越慢
     */
    dolly(value: number): this;
    createLandmark(name: string, params: {
        position: vec3;
        focalPoint: vec3;
        roll?: number;
    }): Landmark;
    setLandmark(name: string): this;
    gotoLandmark(name: string, duration?: number): void;
    /**
     * 根据相机矩阵重新计算各种相机参数
     */
    private _update;
    /**
     * 计算相机矩阵
     */
    private computeMatrix;
    /**
     * Sets the camera position in the camera matrix
     */
    private _setPosition;
    /**
     * Recalculates axes based on the current matrix
     */
    private _getAxes;
    /**
     * Recalculates euler angles based on the current state
     */
    private _getAngles;
    /**
     * 重新计算相机位置，只有 ORBITING 模式相机位置才会发生变化
     */
    private _getPosition;
    /**
     * 重新计算视点，只有 TRACKING 模式视点才会发生变化
     */
    private _getFocalPoint;
    /**
     * 重新计算视距
     */
    private _getDistance;
}
