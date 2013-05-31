#!/bin/bash
#
# auto deploy will call this script after `svn up && mv to target`
#

export LANG=en_US.UTF-8
export PATH=/opt/taobao/install/node.js/bin:$PATH

declare -r __PWD__=$(pwd)
declare -r __USER__=$(whoami)
declare -r VERSION=`date "+%Y%m%d%H%M%S"`

# echo ${__PWD__} "=>" $(dirname -- "${0}")
cd $(dirname -- "${0}")

# remove all change files first
echo "git clean -xfd"
git checkout ./
git clean -xfd

# node version
node -v

# auto update version file
echo ${VERSION} > config/version

make install
if [ ${?} -ne 0 ] ; then
    echo "make install failed!"
    exit 1;
fi

make build
if [ ${?} -ne 0 ] ; then
    echo "make build failed!"
    exit 1;
fi

declare __ENV__=unknow

if [ ${__USER__} == admin ] ; then
    # stg
    __ENV__=daily
fi

if [ ${__USER__} == {{project}}test ] ; then
    # pre
    __ENV__=pre
fi

if [ ${__USER__} == {{project}}build ] ; then
    # production
    __ENV__=production
fi

echo "----------- ${__ENV__} env -------------------"
cp config/config_${__ENV__}.js config/config.js

declare -ra __IGNORE=(\
    "node_modules/supertest" \
    "node_modules/mocha" \
    "node_modules/mm" \
    "node_modules/interceptor" \
    "node_modules/pedding" \
    "node_modules/should" \
    "node_modules/rewire" \
    "node_modules/benchmark" \
    "node_modules/assets_compiler" \
    "public/status.taobao" \
    "test" \
    "coverage.html" \
    "History.md" \
    "Makefile" \
)

for spath in ${__IGNORE[@]} ; do
    /bin/rm -rf ./${spath}
done

cd ${__PWD__}

echo "------------- build.sh success ------------"

exit 0
