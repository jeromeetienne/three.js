# How to test 3d libraries
- Topic: "four.js is currently tested thru 4D Studio. We need to test it independantly too. How to do that ?""
- notes taken thinking about this

tl;dr copy three.js testing. Additionally we do rendering testing to ensure 
the image is rendered properly on a given plateform. Apply the 'examples are tests'
principle from three.js, examples serve as tests and as documentations.

# About Rendering testing
- To test the output of a 3d library is specific due to graphic.
- to test unit testing may ve important but not enougth.
- we should compare our results based on the images they render.
- we can run those tests on various plateforms android/ios/helmet/desktop
  - thus detect webgl-specific issues to IOS or other plateforms.

1. we write a test which render a given scene
2. we render it and take a first screenshot
3. we render it again during the tests, and take a screenshot
4. if the 2 images are close enougth, the test passes

- image comparison could be based on image magick compare 
  - We need to be robust against stuff like anti aliasing support or z-fighting.
  - ```compare``` is a tool to measure the difference between 2 images.
  - it implements various comparison metrics mae/PSNR/RMSE. 

# Relation with three.js ways
- three.js does unit testing  and provides 240+ examples.
  - https://github.com/mrdoob/three.js/tree/master/test
  - https://github.com/mrdoob/three.js/tree/master/examples
- we should copy this model and extend it
- we should automatize the testing of each examples
- we should should do rendering testing too
- three.js uses qunit for unit testing
  - it is browser-only. we could use something like mocha
  - mocha has a client side too.

# Principle 'examples are tests'
- write documentations and test at the same time.
- 3d library is a complex thing. it is rather unpratical to test it well with unit testing
- three.js apply the principle 'examples are tests'
- each examples show a feature of the library
- it serves as documentation when developers are learning to use the library
- it serves as test too. "if the example still work, the feature still work"
