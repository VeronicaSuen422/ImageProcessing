(function(imageproc) {
    "use strict";

    /*
     * Apply ordered dithering to the input data
     */
    imageproc.dither = function(inputData, outputData, matrixType) {
        console.log("Applying dithering...");
        
        // Set up the matrix
        var matrix;
        var levels;

        // Different matrix types
        switch(matrixType) {

            case "bayer2":

                matrix = [ [1, 3], [4, 2] ];
                levels = 5;

                for (let y = 0; y < inputData.height; y++) {
                    for (let x = 0; x < inputData.width; x++) {
                        let pixel = imageproc.getPixel(inputData, x, y);

                        // Change the colour to grayscale and normalize it
                        let value = (pixel.r + pixel.g + pixel.b) / 3;
                        value = value / 255 * levels;

                        // Get the corresponding threshold of the pixel
                        let threshold = matrix[y % 2][x % 2];

                        // Set the colour to black or white based on threshold
                        let i = (x + y * outputData.width) * 4;
                        outputData.data[i]     =
                        outputData.data[i + 1] =
                        outputData.data[i + 2] = (value < threshold)? 0 : 255;
                    }
                }

                break;

            case "bayer4":

                matrix = [ [1, 9, 3, 11], [13, 5, 15, 7], [4, 12, 2, 10], [16, 8, 14, 6] ];
                levels = 17;

                for (let y = 0; y < inputData.height; y++) {
                    for (let x = 0; x < inputData.width; x++) {
                        let pixel = imageproc.getPixel(inputData, x, y);

                        // Change the colour to grayscale and normalize it
                        let value = (pixel.r + pixel.g + pixel.b) / 3;
                        value = value / 255 * levels;

                        // Get the corresponding threshold of the pixel
                        let threshold = matrix[y % 4][x % 4];

                        // Set the colour to black or white based on threshold
                        let i = (x + y * outputData.width) * 4;
                        outputData.data[i]     =
                        outputData.data[i + 1] =
                        outputData.data[i + 2] = (value < threshold)? 0 : 255;
                    }
                }

                break;

            case "line":

                matrix = [ [15, 15, 15, 25],
                           [15, 15, 25, 15],
                           [15, 25, 15, 15],
                           [25, 15, 15, 15] ];
                levels = 100;

                for (let y = 0; y < inputData.height; y++) {
                    for (let x = 0; x < inputData.width; x++) {
                        let pixel = imageproc.getPixel(inputData, x, y);

                        // Change the colour to grayscale and normalize it
                        let value = (pixel.r + pixel.g + pixel.b) / 3;
                        value = value / 255 * levels;

                        // Get the corresponding threshold of the pixel
                        let threshold = matrix[y % 4][x % 4];

                        // Set the colour to black or white based on threshold
                        let i = (x + y * outputData.width) * 4;
                        outputData.data[i]     =
                        outputData.data[i + 1] =
                        outputData.data[i + 2] = (value < threshold)? 0 : 255;
                    }
                }

                break;

            case "diamond":

                matrix = [ [25, 15, 25, 15], 
                           [15, 25, 15, 15], 
                           [25, 15, 15, 15], 
                           [15, 15, 15, 25] ];
                levels = 100;
                
                for (let y = 0; y < inputData.height; y++) {
                    for (let x = 0; x < inputData.width; x++) {
                        let pixel = imageproc.getPixel(inputData, x, y);

                        // Change the colour to grayscale and normalize it
                        let value = (pixel.r + pixel.g + pixel.b) / 3;
                        value = value / 255 * levels;

                        // Get the corresponding threshold of the pixel
                        let threshold = matrix[y % 4][x % 4];

                        // Set the colour to black or white based on threshold
                        let i = (x + y * outputData.width) * 4;
                        outputData.data[i]     =
                        outputData.data[i + 1] =
                        outputData.data[i + 2] = (value < threshold)? 0 : 255;
                    }
                }

                break;

        }

    }
 
}(window.imageproc = window.imageproc || {}));
