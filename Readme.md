
# NGen

 NGen is a nodejs package generator, complete with best practices, package structure, package.json and more.
 Customize for EDP. 
## Installation

    $ npm install ngen-edp

## Usage


    Usage: ngen [options] [path]

    Options:

      -t, --template <name>   Use the template <name>
      -d, --directory <path>  Use the template directory <path>
      -V, --version           Output the current version
      -h, --help              Display help information


## Templates

### Default

 creating the following structure populated with content after the following questions are asked from the cli:  

```
Project name: foo
Enter your name: TJ Holowaychuk
Enter your email: tj@vision-media.ca
Project description: awesome foo-ness
```
 structure:

``` 
History.md
Readme.md
index.js
support
Makefile
package.json
lib/
  |- <project>.js
test/
  |- <project>.test.js
```

### edplib  

 creating the following structure populated with content after the following questions are asked from the cli:  

```
Project name: edplib
Enter your name: 不四
Enter your email: busi.hyy@taobao.com
Project description: edplib gen by ngen-edp
```
 structure:
 
``` 
History.md
Readme.md
index.js
Makefile
package.json
.gitignore
lib/
  |- <project>.js
test/
  |- -<project>.test.js
  |- mocha.opts
```
### edpweb   

 creating the following structure populated with content after the following questions are asked from the cli:  

```
Project name: edpweb
Enter your name: 不四
Enter your email: busi.hyy@taobao.com
Project description: edpweb gen by ngen-edp
```
 structure:
 
``` 
History.md
Readme.md
app.js
dispatch.js
Makefile
package.json
.gitignore
config/
  |- index.js
  |- config_daily.js
  |- config_pre.js
  |- config_production.js
controllers/
common/
lib/
proxy/
public/
views/
test/
  |- controllers/
  |- common/
  |- proxy/
  |- lib/
  |- mocha.opts
  |- app.test.js
```

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
