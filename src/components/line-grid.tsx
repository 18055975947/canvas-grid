/*
 * @Author: GQK
 * @Date: 2022-08-15 15:25:23
 * @LastEditTime: 2022-08-19 16:05:12
 * @Description:  line grid
 * @FilePath: /canvas-grid/src/components/line-grid.tsx
 */
import React, { useState } from 'react';
import { Layer, Rect, Line } from "react-konva";

export const LineGrid = (props: any) => {
    const { scale, stagePos, CanvasWidth, CanvasHeight } = props;
    // 需要插入的网格 components
    const gridComponents = [];
    // 网格分成多少份 宽度 * 倍数 / 需要多少网格数
    const girdSize = 100 * scale / 20;
    // canvas X、Y 轴距离 stagePos x y 的距离
    const canvasXHeight = CanvasHeight - stagePos.y;
    const canvasYWidth = CanvasWidth - stagePos.x;
    const [solidColor] = useState<string>('#CCCCCC70'); // 实线颜色
    const [dashedColor] = useState<string>('#CCCCCC25'); // 虚线颜色
    const [zeroColor] = useState<string>('#358bf3'); // 0 点颜色
    const [strokeWidth] = useState<number>(1); // strokeWidth
    const [shadowOpacity] = useState<number>(0); // shadowOpacity
    const [shadowEnabled] = useState<boolean>(false); // shadowEnabled

    // 从 pageSlicePos.y 处开始往 Y 轴正方向画 X 轴网格
    const xPageSliceTotal = Math.ceil(canvasXHeight / girdSize);
    for (let i = 0; i < xPageSliceTotal; i++) {
        gridComponents.push(<Line
            x={0 - stagePos.x}
            y={girdSize * i}
            strokeWidth={strokeWidth}
            shadowOpacity={shadowOpacity}
            shadowEnabled={shadowEnabled}
            points={[0, 0, CanvasWidth, 0]}
            stroke={i === 0 ? zeroColor : i % 5 === 0 ? solidColor : dashedColor}
        />)
    }

    // 从 pageSlicePos.y 处开始往 Y 轴负方向画 X 轴网格
    const xRemaining = stagePos.y;
    const xRemainingTotal = Math.ceil(xRemaining / girdSize);
    for (let i = 0; i < xRemainingTotal; i++) {
        if (i === 0) continue;
        gridComponents.push(<Line
            x={0 - stagePos.x}
            y={-girdSize * i}
            strokeWidth={strokeWidth}
            shadowOpacity={shadowOpacity}
            shadowEnabled={shadowEnabled}
            points={[0, 0, CanvasWidth, 0]}
            stroke={i === 0 ? zeroColor : i % 5 === 0 ? solidColor : dashedColor}
        />)
    }

    // 从 pageSlicePos.x 处开始往 X 轴正方向画 Y 轴网格
    const yPageSliceTotal = Math.ceil(canvasYWidth / girdSize); // 计算需要绘画y轴的条数
    for (let j = 0; j < yPageSliceTotal; j++) {
        gridComponents.push(<Line
            x={girdSize * j}
            y={0 - stagePos.y}
            strokeWidth={strokeWidth}
            shadowOpacity={shadowOpacity}
            shadowEnabled={shadowEnabled}
            points={[0, 0, 0, CanvasHeight]}
            stroke={j === 0 ? zeroColor : j % 5 === 0 ? solidColor : dashedColor}
        />)
    }

    // 从 pageSlicePos.x 处开始往 X 轴负方向画 Y 轴网格
    const yRemaining = stagePos.x;
    const yRemainingTotal = Math.ceil(yRemaining / girdSize);
    for (let j = 0; j < yRemainingTotal; j++) {
        if (j === 0) continue;
        gridComponents.push(<Line
            x={-girdSize * j}
            y={0 - stagePos.y}
            strokeWidth={strokeWidth}
            shadowOpacity={shadowOpacity}
            shadowEnabled={shadowEnabled}
            points={[0, 0, 0, CanvasHeight]}
            stroke={j === 0 ? zeroColor : j % 5 === 0 ? solidColor : dashedColor}
        />)
    }

    // 0 0 位置画一个 10 10 的红色 rect 矩形
    gridComponents.push(<Rect
        x={0}
        y={0}
        width={10}
        height={10}
        fill="red"
    />);

    return (
        <Layer>
            {gridComponents}
        </Layer>
    );
};