# install frontend packages
cd nav-app
npm install

# build app for packaging as app
npm run-script build
mkdir ../qradar/app/public
cp -r dist/* ../qradar/app/public

# install backend packages
cd ../qradar/app
npm install

# zip file for release
cd ../
zip -r attacknavigator.zip *

# deploy with 
# qradar_app_creator deploy -q <ip> -u <user> attacknavigator.zip