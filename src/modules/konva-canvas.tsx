/*
 * @Author: GQK
 * @Date: 2022-08-11 10:48:47
 * @LastEditTime: 2022-08-19 16:13:30
 * @Description:  konva canvas2
 * @FilePath: /canvas-grid/src/mudoles/konva-canvas.tsx
 */
import React, { useState } from "react";
import { Button } from 'antd';
import { Stage } from "react-konva";
import { LineGrid } from '../components/line-grid';

export const KonvasCanvas = () => {
    const [scale, setScale] = useState<number>(1); // 缩放比例
    const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 }); // 页面 0 0 坐标位置
    const [CanvasWidth] = useState<number>(600); // canvas 宽度
    const [CanvasHeight] = useState<number>(400); // canvas 高度
    
    /**
     * 点击缩放
     */
    const clickScale = () => {
        const scaleVal = scale + 1 > 6 ? 1 : scale + 1;
        setScale(scaleVal);
    }
    return (
        <div className='konva' style={{ width: '600px', margin: '20px auto', }}>
            <Button onClick={clickScale}>缩放{scale}</Button>
            <div id="konva-canvas">
                <Stage
                    x={stagePos.x}
                    y={stagePos.y}
                    width={CanvasWidth}
                    height={CanvasHeight}
                    strokeWidth={1}
                    draggable
                    onDragMove={e => {
                        // 拖动事件，设置 stagePos 值
                        const { x, y } = e.currentTarget.position();
                        setStagePos({
                            x: Math.round(x),
                            y: Math.round(y),
                        });
                    }}
                >
                    <LineGrid scale={scale} CanvasWidth={CanvasWidth} CanvasHeight={CanvasHeight} stagePos={stagePos} />
                </Stage>
            </div>
        </div>
    )
};