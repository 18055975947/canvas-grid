/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: GQK
 * @Date: 2022-08-09 11:27:19
 * @LastEditTime: 2022-08-19 15:10:32
 * @Description:  原生 canvas 绘制
 * @FilePath: /canvas-grid/src/mudoles/canvas-grid.tsx
 */
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { IPageSlicePosType } from './type';

export const CanvasGrid = () => {

    // 当前 canvas 的 0 0 坐标，我们设置 canvas 左上角顶点为 0 0，向右👉和向下👇是 X Y 轴正方向，0，0 为 pageSlicePos 初始值
    const [pageSlicePos, setPageSlicePos] = useState<IPageSlicePosType>({
        x: 0,
        y: 0,
    });
    const [ctxVal, setCtxVal] = useState<any>(null); // canvas 的 ctx
    const [scale, setScale] = useState<number>(1); // 缩放比例
    const [solidColor] = useState<string>('#CCCCCC70'); // 实线颜色
    const [dashedColor] = useState<string>('#CCCCCC25'); // 虚线颜色
    const [zeroColor] = useState<string>('#358bf3'); // 0 点坐标系颜色

    /**
     * 点击缩放，设置缩放倍数
     */
    const clickScale = () => {
        const scaleVal = scale + 1 > 6 ? 1 : scale + 1;
        setScale(scaleVal);
        ctxVal.clearRect(0, 0, ctxVal.canvas.width, ctxVal.canvas.height);
        drawLineGrid(scaleVal);
    }

    // 监听 pageSlicePos 数据，有变动则进行 canvas 的绘制
    useEffect(() => {
        if (ctxVal) {
            // 重新绘制之前清空 canvas
            ctxVal.clearRect(0, 0, ctxVal.canvas.width, ctxVal.canvas.height);
        }
        drawLineGrid();
    }, [pageSlicePos]);

    /**
     * 绘制网格
     * @param scaleVal 缩放倍数
     */
    const drawLineGrid = (scaleVal = scale) => {
        /*获取元素*/
        var myCanvas: any = document.querySelector('#myCanvas');
        /*获取绘图工具*/
        var ctx = ctxVal || myCanvas.getContext('2d');
        setCtxVal(ctx);
        // 1. 设置网格大小
        var girdSize = 5 * scaleVal;

        // 2. 获取Canvas的width、height
        var CanvasWidth = ctx.canvas.width;
        var CanvasHeight = ctx.canvas.height;

        // 在 pageSlicePos 的 x，y 点位画一个 10 * 10 的红色标记用来表示当前页面的 0 0 坐标
        ctx.fillRect(pageSlicePos.x, pageSlicePos.y, 10, 10);
        ctx.fillStyle = 'red';

        const canvasXHeight = CanvasHeight - pageSlicePos.y;
        const canvasYWidth = CanvasWidth - pageSlicePos.x;
        // 从 pageSlicePos.y 处开始往 Y 轴正方向画 X 轴网格
        const xPageSliceTotal = Math.ceil(canvasXHeight / girdSize);
        for (let i = 0; i < xPageSliceTotal; i++) {
            ctx.beginPath(); // 开启路径，设置不同的样式
            ctx.moveTo(0, pageSlicePos.y + girdSize * i);
            ctx.lineTo(CanvasWidth, pageSlicePos.y + girdSize * i);
            ctx.strokeStyle = i === 0 ? zeroColor : (i % 5 === 0 ? solidColor : dashedColor); // 如果为 0 则用蓝色标记，取余 5 为实线，其余为比较淡的线
            ctx.stroke();
        }

        // 从 pageSlicePos.y 处开始往 Y 轴负方向画 X 轴网格
        const xRemaining = pageSlicePos.y;
        const xRemainingTotal = Math.ceil(xRemaining / girdSize);
        for (let i = 0; i < xRemainingTotal; i++) {
            if (i === 0) continue;
            ctx.beginPath(); // 开启路径，设置不同的样式
            ctx.moveTo(0, pageSlicePos.y - girdSize * i); // -0.5是为了解决像素模糊问题
            ctx.lineTo(CanvasWidth, pageSlicePos.y - girdSize * i);
            ctx.strokeStyle = i === 0 ? zeroColor : (i % 5 === 0 ? solidColor : dashedColor);// 如果为 0 则用蓝色标记，取余 5 为实线，其余为比较淡的线
            ctx.stroke();
        }

        // 从 pageSlicePos.x 处开始往 X 轴正方向画 Y 轴网格
        const yPageSliceTotal = Math.ceil(canvasYWidth / girdSize); // 计算需要绘画y轴的条数
        for (let j = 0; j < yPageSliceTotal; j++) {
            ctx.beginPath(); // 开启路径，设置不同的样式
            ctx.moveTo(pageSlicePos.x + girdSize * j, 0);
            ctx.lineTo(pageSlicePos.x + girdSize * j, CanvasHeight);
            ctx.strokeStyle = j === 0 ? zeroColor : (j % 5 === 0 ? solidColor : dashedColor);// 如果为 0 则用蓝色标记，取余 5 为实线，其余为比较淡的线
            ctx.stroke();
        }

        // 从 pageSlicePos.x 处开始往 X 轴负方向画 Y 轴网格
        const yRemaining = pageSlicePos.x;
        const yRemainingTotal = Math.ceil(yRemaining / girdSize);
        for (let j = 0; j < yRemainingTotal; j++) {
            if (j === 0) continue;
            ctx.beginPath(); // 开启路径，设置不同的样式
            ctx.moveTo(pageSlicePos.x - girdSize * j, 0);
            ctx.lineTo(pageSlicePos.x - girdSize * j, CanvasHeight);
            ctx.strokeStyle = j === 0 ? zeroColor : (j % 5 === 0 ? solidColor : dashedColor);// 如果为 0 则用蓝色标记，取余 5 为实线，其余为比较淡的线
            ctx.stroke();
        }
    };

    /**
     * 拖动 canvas 动态渲染，拖动时，动态设置 pageSlicePos 的值
     * @param e Event
     */
    const mouseDown = (e: any) => {
        const downX = e.clientX;
        const downY = e.clientY;
        const { x, y } = pageSlicePos;
        var myCanvas: any = document.querySelector('#myCanvas');
        myCanvas.onmousemove = (ev: any) => {
            const moveX = ev.clientX;
            const moveY = ev.clientY;
            setPageSlicePos({
                x: x + (moveX - downX),
                y: y + (moveY - downY),
            });
            myCanvas.onmouseup = (en: any) => {
                myCanvas.onmousemove = null;
                myCanvas.onmouseup = null;
            };
        }
        myCanvas.onmouseup = (en: any) => {
            myCanvas.onmousemove = null;
            myCanvas.onmouseup = null;
        };
    }
    return (
        <div className='canvas'>
            <div>
                <Button onClick={clickScale}>缩放{scale}</Button>
            </div>
            <div style={{ width: '600px', margin: '0 auto'}}>
                <canvas onMouseDown={mouseDown} id="myCanvas" width="600" height="400"></canvas>
            </div>
        </div>
    )
}