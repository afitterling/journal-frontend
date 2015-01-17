gulp clean
gulp build
rsync -avur app/bower_components dist/
./scripts/patch_baseUrl.sh 
./scripts/push.sh
