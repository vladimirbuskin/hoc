## Trying HOC to load data
 
I thought to try out without redux, for this simple application
Tried Higher Order Component Techinque

[![Build Status](https://travis-ci.org/vladimirbuskin/hoc.svg?branch=master)](https://travis-ci.org/vladimirbuskin/hoc)


For regular browsers
<a href="https://vladimirbuskin.github.io/hoc/demo/">https://vladimirbuskin.github.io/hoc/demo/</a>

TODO:
tried in chrome, may not work in older browsers,
need to include polyfils


NOTES:
i've added .babelrc and added jest configuration into package.json because 

```
"react-scripts test" command
```

is using jest prior v18.1 and does not output console.* in tests.
so i installed v18.1 and using it through

```
'jest' command
```

after react-scripts updated to later than v18.1 we can delete
```
__mocks__     
package.json - only jest section
babel.rc      
```

