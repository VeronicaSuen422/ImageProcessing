# ImageProcessing
HKUST COMP4431 Lab 5-7

<img width="1378" alt="Screenshot 2023-10-04 at 23 47 05" src="https://github.com/VeronicaSuen422/ImageProcessing/assets/90737034/3eb77173-a88b-4181-a31e-73dd1897d3c5">

## Run the program
1. Run python3 -m http.server
2. Open the webpage via a browser with the URL: http://localhost:8000/imageproc.html

## About the program

### Basic processing selections
- Do nothing
- Negation
- GrayScale
- Brightness
  - Brightness offset
- Contrast
  - Contrast factor
- Posterization
  - Red bits to keep
  - Green bits to keep
  - Blue bits to keep
- Threshold
  - Threshold value
- Comic Colour
  - Saturation multiplier
- Automatic Contrast
  - Type (Gray level / Individual colour)
  - Percentage of pixels to ignore
 
### Base layer selections
- Do nothing
- Blur
  - Input (Original Image / Processed Image)
  - Kernel size (3x3 / 5x5 / 7x7 / 9x9)
- Kuwahara Filter
  - Input (Original Image / Processed Image)
  - Filter size (5x5 / 9x9 / 13x13)

### Shade layer selections
- Do nothing
- Ordered dithering
  - Input (Original Image / Processed Image)
  - Matrix type (Bayer's 2x2 matrix / Bayer's 4x4 matrix / diagonal lines / diamonds)
  - White shown as transparent (on / off)

### outline layer selections
- Do nothing
- Sobel edge
  - Input (Original Image / Processed Image)
  - Threshold value
  - Flip edge colour (on / off)
  - Blur before edge detection (on / off)
  - Non-edge shown as transparent (on / off)
  - Blur kernel size (3x3 / 5x5 / 7x7 / 9x9)
