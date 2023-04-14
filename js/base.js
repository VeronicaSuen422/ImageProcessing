(function(imageproc) {
    "use strict";

    /*
     * Apply negation to the input data
     */
    imageproc.negation = function(inputData, outputData) {
        console.log("Applying negation...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            outputData.data[i]     = 255 - inputData.data[i];
            outputData.data[i + 1] = 255 - inputData.data[i + 1];
            outputData.data[i + 2] = 255 - inputData.data[i + 2];
        }
    }

    /*
     * Convert the input data to grayscale
     */
    imageproc.grayscale = function(inputData, outputData) {
        console.log("Applying grayscale...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
           let intensity = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3;
            // Change the RGB components to the resulting value
            outputData.data[i]     = intensity;
            outputData.data[i + 1] = intensity;
            outputData.data[i + 2] = intensity;
        }
    }

    /*
     * Applying brightness to the input data
     */
    imageproc.brightness = function(inputData, outputData, offset) {
        console.log("Applying brightness...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by adding an offset
            outputData.data[i]     = inputData.data[i] + offset;
            outputData.data[i + 1] = inputData.data[i + 1] + offset;
            outputData.data[i + 2] = inputData.data[i + 2] + offset;
            // Handle clipping of the RGB components
            if (outputData.data[i] > 255) {
                outputData.data[i] = 255;
            } else if (outputData.data[i] < 0) {
                outputData.data[i] = 0;
            }
            if (outputData.data[i + 1] > 255) {
                outputData.data[i + 1] = 255;
            } else if (outputData.data[i + 1] < 0) {
                outputData.data[i + 1] = 0;
            }
            if (outputData.data[i + 2] > 255) {
                outputData.data[i + 2] = 255;
            } else if (outputData.data[i + 2] < 0) {
                outputData.data[i + 2] = 0;
            }
        }
    }

    /*
     * Applying contrast to the input data
     */
    imageproc.contrast = function(inputData, outputData, factor) {
        console.log("Applying contrast...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Change the RGB components by multiplying a factor
            outputData.data[i]     = inputData.data[i] * factor;
            outputData.data[i + 1] = inputData.data[i + 1] * factor;
            outputData.data[i + 2] = inputData.data[i + 2] * factor;
            // Handle clipping of the RGB components
            if (outputData.data[i] > 255) {
                outputData.data[i] = 255;
            } else if (outputData.data[i] < 0) {
                outputData.data[i] = 0;
            }
            if (outputData.data[i + 1] > 255) {
                outputData.data[i + 1] = 255;
            } else if (outputData.data[i + 1] < 0) {
                outputData.data[i + 1] = 0;
            }
            if (outputData.data[i + 2] > 255) {
                outputData.data[i + 2] = 255;
            } else if (outputData.data[i + 2] < 0) {
                outputData.data[i + 2] = 0;
            }
        }
    }

    /*
     * Make a bit mask based on the number of MSB required
     */
    function makeBitMask(bits) {
        var mask = 0;
        for (var i = 0; i < bits; i++) {
            mask >>= 1;
            mask |= 128;
        }
        return mask;
    }

    /*
     * Apply posterization to the input data
     */
    imageproc.posterization = function(inputData, outputData,
                                       redBits, greenBits, blueBits) {
        console.log("Applying posterization...");

        // Create the red, green and blue masks
        // A function makeBitMask() is already given
        let redMask = makeBitMask(redBits);
        let greenMask = makeBitMask(greenBits);
        let blueMask = makeBitMask(blueBits);

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Apply the bitmasks onto the RGB channels
            outputData.data[i]     = inputData.data[i] & redMask;
            outputData.data[i + 1] = inputData.data[i + 1] & greenMask;
            outputData.data[i + 2] = inputData.data[i + 2] & blueMask;
        }
    }

    /*
     * Apply threshold to the input data
     */
    imageproc.threshold = function(inputData, outputData, thresholdValue) {
        console.log("Applying thresholding...");

        for (var i = 0; i < inputData.data.length; i += 4) {
            // Find the grayscale value using simple averaging
            var grayscale = (inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3;
            // You will apply thresholding on the grayscale value
            // Change the colour to black or white based on the given threshold
            if (grayscale > thresholdValue) {
                outputData.data[i]     = 255;
                outputData.data[i + 1] = 255;
                outputData.data[i + 2] = 255;
            } else {
                outputData.data[i]     = 0;
                outputData.data[i + 1] = 0;
                outputData.data[i + 2] = 0;
            }
        }
    }

    /*
     * Build the histogram of the image for a channel
     */
    function buildHistogram(inputData, channel) {
        var histogram = [];
        for (var i = 0; i < 256; i++) {
            histogram[i] = 0;
        }

        // Accumulate the histogram based on the input channel
        // The input channel can be:
        // "red"   - building a histogram for the red component
        // "green" - building a histogram for the green component
        // "blue"  - building a histogram for the blue component
        // "gray"  - building a histogram for the intensity
        //           (using simple averaging)

        switch (channel) {

            // Channel = gray
            case "gray":
                for (let i = 0; i < inputData.data.length; i += 4) {
                    let intensity = Math.round((inputData.data[i] + inputData.data[i + 1] + inputData.data[i + 2]) / 3);
                    histogram[intensity] += 1;
                }
                break;

            // Channel = red
            case "red":
                for (let i = 0; i < inputData.data.length; i += 4) {
                    let red_intensity = inputData.data[i];
                    histogram[red_intensity] += 1;
                }
                break;
            
            // Channel = green
            case "green": 
                for (let i = 0; i < inputData.data.length; i += 4) {
                    let green_intensity = inputData.data[i + 1];
                    histogram[green_intensity] += 1;
                }
                break;

            // Channel = blue
            case "blue":
                for (let i = 0; i < inputData.data.length ; i += 4) {
                    let blue_intensity = inputData.data[i + 2];
                    histogram[blue_intensity] += 1;
                }
                break;
            
        }

        return histogram;
    }

    /*
     * Find the min and max of the histogram
     */
    function findMinMax(histogram, pixelsToIgnore) {

        var min = 0, max = 255;
        var pixelBelowRange = 0;
        var pixelAboveRange = 0;

        // Find the minimum in the histogram with non-zero value by ignoring the number of pixels given by pixelsToIgnore
        for (min = 0; min < 256; min++) { // Minimum among all pixels
            if (histogram[min] > 0) 
               break;
        }
        for (let i = min; i < 256; i++) { // min = first non-zero value among all
            pixelBelowRange += histogram[i];
            if (pixelBelowRange >= pixelsToIgnore) {
                min = i;
                break;
             }
        }
       
        // Find the maximum in the histogram with non-zero value by ignoring the number of pixels given by pixelsToIgnore
        for (max = 255; max > 0; max--) {
            if (histogram[max]> 0)
                break;
        }
        for (let i = max; i > -1; i--) {
            pixelAboveRange += histogram[i];
            if (pixelAboveRange >= pixelsToIgnore) {
                max = i;
                break;
            }
        }

        return {"min": min, "max": max};
    }

    /*
     * Apply automatic contrast to the input data
     */
    imageproc.autoContrast = function(inputData, outputData, type, percentage) {
        console.log("Applying automatic contrast...");

        // Find the number of pixels to ignore from the percentage
        var pixelsToIgnore = (inputData.data.length / 4) * percentage;

        var histogram, minMax;
        if (type == "gray") {
            // Build the grayscale histogram
            histogram = buildHistogram(inputData, "gray");

            // Find the minimum and maximum grayscale values with non-zero pixels
            minMax = findMinMax(histogram, pixelsToIgnore);
            var min = minMax.min, max = minMax.max, range = max - min;
            
            for (var i = 0; i < inputData.data.length; i += 4) {
                // Adjust each pixel based on the minimum and maximum values
                // For grayscale, c = (c - min) / (max - min) * 255;

                outputData.data[i]     = (inputData.data[i] - min) / range * 255;
                outputData.data[i + 1] = (inputData.data[i + 1] - min) / range * 255;
                outputData.data[i + 2] = (inputData.data[i + 2] - min) / range * 255;
                // Handle clipping
                if (outputData.data[i] > 255) {
                    outputData.data[i] = 255;
                }
                if (outputData.data[i] < 0) {
                    outputData.data[i] = 0;
                }
                if (outputData.data[i + 1] > 255) {
                    outputData.data[i + 1] = 255;
                }
                if (outputData.data[i + 1] < 0) {
                    outputData.data[i + 1] = 0;
                }
                if (outputData.data[i + 2] > 255) {
                    outputData.data[i + 2] = 255;
                }
                if (outputData.data[i + 2] < 0) {
                    outputData.data[i + 2] = 0;
                }
            }
        }
        else {

            // Build the individual color histograms
            let histogramRed = buildHistogram(inputData, "red");
            let histogramGreen = buildHistogram(inputData, "green");
            let histogramBlue = buildHistogram(inputData, "blue");

            // Find the minimum and maximum red values with non-zero pixels
            let minMaxRed = findMinMax(histogramRed, pixelsToIgnore);
            let minRed = minMaxRed.min;
            let maxRed = minMaxRed.max;
            let rangeRed = maxRed - minRed;
            // Find the minimum and maximum green values with non-zero pixels
            let minMaxGreen = findMinMax(histogramGreen, pixelsToIgnore);
            let minGreen = minMaxGreen.min;
            let maxGreen = minMaxGreen.max;
            let rangeGreen = maxGreen - minGreen;
            // Find the minimum and maximum blue values with non-zero pixels
            let minMaxBlue = findMinMax(histogramBlue, pixelsToIgnore);
            let minBlue = minMaxBlue.min;
            let maxBlue = minMaxBlue.max;
            let rangeBlue = maxBlue - minBlue;

            // Adjust each pixel based on the minimum and maximum values
            for (var i = 0; i < inputData.data.length; i += 4) { 

                outputData.data[i]     = (inputData.data[i] - minRed) / rangeRed * 255;
                outputData.data[i + 1] = (inputData.data[i + 1] - minGreen) / rangeGreen * 255;
                outputData.data[i + 2] = (inputData.data[i + 2] - minBlue) / rangeBlue * 255;
                // Handle clipping
                if (outputData.data[i] > 255) {
                    outputData.data[i] = 255;
                }
                if (outputData.data[i] < 0) {
                    outputData.data[i] = 0;
                }
                if (outputData.data[i + 1] > 255) {
                    outputData.data[i + 1] = 255;
                }
                if (outputData.data[i + 1] < 0) {
                    outputData.data[i + 1] = 0;
                }
                if (outputData.data[i + 2] > 255) {
                    outputData.data[i + 2] = 255;
                }
                if (outputData.data[i + 2] < 0) {
                    outputData.data[i + 2] = 0;
                }
            }

        }
    }

}(window.imageproc = window.imageproc || {}));
