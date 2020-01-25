#!/bin/bash

NODEJS_PACKAGE_NAME="node-v10.15.0-linux-x64.tar.xz"
NODEJS_EXECUTABLE_NAME="node-v10.15.0-linux-x64"

rpm -ivh /src_deps/init/rpms/xz-4.999.9-0.5.beta.20091007git.el6.x86_64.rpm
tar -xJf /src_deps/init/rpms/$NODEJS_PACKAGE_NAME -C /opt

if [ ! -d "/opt/$NODEJS_EXECUTABLE_NAME" ]
then
  #it looks that installing the rpm failed, so we will fall back to the internet
  yum -y install xz
  tar -xJf /src_deps/init/rpms/$NODEJS_PACKAGE_NAME -C /opt
fi

ln -s /opt/$NODEJS_EXECUTABLE_NAME/bin/node /usr/local/bin/node
ln -s /opt/$NODEJS_EXECUTABLE_NAME/bin/npm /usr/local/bin/npm


cp /src_deps/init/start_flask.sh /
