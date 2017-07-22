## Webpack Tree Shaking Test

This Repo is used to test what impact will have on your code with webpack's new tree shaking feature and what configuration needs to be made to enable the feature.

## Test Example Code

I created two independent directories for test, one is for webpack1 the other is for webpack3.

In both directory, we have test code using lodash as well as our own code.

The examples are:

- partial import our own module: `import { a } from './lib` 
- import whole lodash: `import lodash from 'lodash` 
- import named lodash module: `import { uniq } from 'lodash` 
- import single lodash module: `import uniq from 'lodash/uniq`

Notice for all lodash example, we only use the `uniq` function.

## Results

Check out the results for webpack1 and webpack2:

### Webpack1


```
                          Asset       Size  Chunks             Chunk Names
         lodashImportAllTest.js    71.8 kB       0  [emitted]  lodashImportAllTest
       lodashNamedImportTest.js    71.8 kB       1  [emitted]  lodashNamedImportTest
lodashSingleModuleImportTest.js     7.6 kB       2  [emitted]  lodashSingleModuleImportTest
          particalImportTest.js  472 bytes       3  [emitted]  particalImportTest
    + 61 hidden modules
```

The dist file for `partialImportTest.js` (the unused module `b` is added in the dist file as well):

```
!function(t){function e(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return t[o].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}({0:function(t,e,n){"use strict";var o=n(57);(0,o.a)()},57:function(t,e){"use strict";function n(){return console.log("I am function a!")}function o(){return console.log("I am function b!")}Object.defineProperty(e,"__esModule",{value:!0}),e.a=n,e.b=o,e.default={a:n,b:o}}});
```


### Webpack2

```

                          Asset       Size  Chunks             Chunk Names
lodashSingleModuleImportTest.js    7.94 kB       0  [emitted]  lodashSingleModuleImportTest
       lodashNamedImportTest.js    72.5 kB       1  [emitted]  lodashNamedImportTest
         lodashImportAllTest.js    72.5 kB       2  [emitted]  lodashImportAllTest
          particalImportTest.js  647 bytes       3  [emitted]  particalImportTest
```

The dist file for `partialImportTest.js` (the unused module `b` is not added in the dist file as well):

``` 
!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=60)}({60:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(61).a()},61:function(e,t,n){"use strict";function r(){return console.log("I am function a!")}t.a=r}});
```

### Result Conclusion

- Tree shaking does not work with `lodash` (`lodash-es` as well, I have tried, and the file size is twice bigger)
- Tree shaking works for my own code, webpack only imports what is used
- Webpack1 seems to generate smaller file.

## Configuration Needed For Tree Shaking
 
The documentation for [Tree Shaking](https://webpack.js.org/guides/tree-shaking/) is actually not complete, and I won't blame you if you can't make tree shaking work by following its documentation.

So for the tree shaking to work, there's actually two dependencies:

- disable babel-loader's es6 module transformation, let webpack to take over it (the new ability for webpack is that it now understand es6 module now)
- enable uglifyJS compression


To disable your babel-loader's es6 module transformation, update your options for babel-loader like below:

```
{
    loader: 'babel-loader',
    options: {
        presets: [['es2015', { modules: false }], ...],
    },
},

```

And add uglifyJS:

``` 
plugins:[
    new webpack.optimize.UglifyJsPlugin(),
],
```

You are ready to shake trees!

## Final Conclusion

As soon as Tree Shaking does not work effectively with libraries like `lodash`, the major benefits we can get may actually from downsizing our own code by getting rid of unused dead code.

However, for most project caring very much about its performance, they might already have been using tools like eslint to help them avoid bad practices during their development. 

So I doubt how much average optimisation serious projects can get from Tree Shaking.

So you should lower your expectation of how much performance improvement that Tree Shaking will bring to your website.