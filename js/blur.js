(function(imageproc) {
    "use strict";

    /*
     * Apply blur to the input data
     */
    imageproc.blur = function(inputData, outputData, kernelSize) {
        console.log("Applying blur...");

        // Build the corresponsing kernel
        var kernel = [];
        for (let j = 0; j < kernelSize; j++) {
            kernel.push([]);
            for (let i = 0; i < kernelSize; i++) {
                kernel[j].push(1);
            }
        }

        var divisor = kernelSize * kernelSize;
        var kernelIndex = (kernelSize - 1) / 2;

        // Apply the kernel to the whole image
        for (var y = 0; y < inputData.height; y++) {
            for (var x = 0; x < inputData.width; x++) {

                // Use imageproc.getPixel() to get the pixel values over the kernel
                let redSum = 0;
                let greenSum = 0;
                let blueSum = 0;

                for (var j = -kernelIndex ; j <= kernelIndex; j++) {
                    for (var i = -kernelIndex; i <= kernelIndex; i++) {
                        // Get pixel information
                        var pixel = imageproc.getPixel(inputData, x+i, y+j);
                        // Multiply pixels (x+i, y+j) with coefficient
                        redSum = redSum + kernel[j+kernelIndex][i+kernelIndex] * pixel.r;
                        greenSum = greenSum + kernel[j+kernelIndex][i+kernelIndex] * pixel.g;
                        blueSum = blueSum + kernel[j+kernelIndex][i+kernelIndex] * pixel.b;
                    }
                }

                // Divided by divisor of the kernel
                let redMean = redSum / divisor;
                let greenMean = greenSum / divisor;
                let blueMean = blueSum / divisor;

                // Then set the blurred result to the output data
                var i = (x + y * outputData.width) * 4;
                outputData.data[i]     = redMean;
                outputData.data[i + 1] = greenMean;
                outputData.data[i + 2] = blueMean;
            }
        }
    } 

}(window.imageproc = window.imageproc || {}));
