(function(imageproc) {
    "use strict";

    /*
     * Apply sobel edge to the input data
     */
    imageproc.sobelEdge = function(inputData, outputData, threshold) {
        console.log("Applying Sobel edge detection...");

        /* Initialize the two edge kernel Gx and Gy */
        var Gx = [
            [-1, 0, 1],
            [-2, 0, 2],
            [-1, 0, 1]
        ];
        var Gy = [
            [-1,-2,-1],
            [ 0, 0, 0],
            [ 1, 2, 1]
        ];

        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {

                var Gx_result = 0;
                var Gy_result = 0;
                for (var j = -1; j <= 1; j++) {
                    for (var i = -1; i <= 1; i++) {
                        var pixel = imageproc.getPixel(inputData, x + i, y + j);
                        var value = (pixel.r + pixel.g + pixel.b) / 3;
                        Gx_result = Gx_result + Gx[j + 1][i + 1] * value;
                        Gy_result = Gy_result + Gy[j + 1][i + 1] * value;
                    }
                }
                var G_result = Math.hypot(Gx_result, Gy_result);

                var i = (x + y * outputData.width) * 4;
                if (G_result < threshold) {
                    outputData.data[i]     = 0;
                    outputData.data[i + 1] = 0;
                    outputData.data[i + 2] = 0;
                } else {
                    outputData.data[i]     = 255;
                    outputData.data[i + 1] = 255;
                    outputData.data[i + 2] = 255;
                }
                
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
