#!/bin/bash
trap "kill -- -$$" EXIT
node /app/server.js 2>&1 | tee -a /store/log/startup.log
