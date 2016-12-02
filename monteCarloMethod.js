"use strict";

class monteCarloMethod {

    constructor() {
        let instance = null;
        let functionLine = null;
        let startValue = null;
        let finishValue = null;
        let rectangleHeight = null;
    }

    drawPlot() {
        try {
            this.functionLine = document.getElementById('function').value;
            this.startValue = document.getElementById('start').value;
            this.finishValue = document.getElementById('finish').value;

            this.rectangleHeight = eval("let x = " + this.finishValue + ";" + this.functionLine);

            this.instance = functionPlot({
                target: '#plot',
                width: 1140,
                height: 480,
                grid: true,
                data: [
                    {
                        fn: this.functionLine,
                    },
                    {
                        points: [
                            [this.startValue, 0], //x, y
                            [this.finishValue, 0],
                            [this.finishValue, this.rectangleHeight],
                            [this.startValue, this.rectangleHeight],
                            [this.startValue, 0]
                        ],
                        fnType: 'points',
                        graphType: 'polyline'
                    },
                    {
                        points: [
                        ],
                        fnType: 'points',
                        graphType: 'scatter',
                        color: 'red'
                    }
                ]
            })
        }
        catch (err) {
            console.log("drawPlot error! " + err);
        }
    };

    addPoints(count) {
        try {
            for (let i = 0; i < count; i++) {
                this.instance.options.data[2].points.push([this.randomInRange(+this.startValue, +this.finishValue), this.randomInRange(0, +this.rectangleHeight)]);
            }
        }
        catch (err) {
            console.log("addPoint error! " + err);
        }
    };

    removePoints(count) {
        try {
            this.instance.options.data[2].points.splice(0, count);
        }
        catch (err) {
            console.log("removePoint error! " + err);
        }

    };

    getSquare() {
        let up = 0, under = 0;
        for (let point of this.instance.options.data[2].points) {
            eval("let x = " + point[0] + ";" + this.functionLine) > +point[1] ? under++ : up++;
        }
        let ratio = under / (up + under);

        let rectangleSquare = (this.finishValue - this.startValue) * this.rectangleHeight;

        let square = rectangleSquare * ratio;

        console.log(`up: ${up} | under: ${under} | rectangle square: ${rectangleSquare} \nSummary: ${square.toFixed(2)}`);

        return square;
    };

    randomInRange(start, end) {
        try {
            let output = Math.random() * (end - start) + start;
            return output;
        }
        catch (err) {
            console.log("randomInRange error! " + err);
        }
    };

}


