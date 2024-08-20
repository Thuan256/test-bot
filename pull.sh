current_path="$PWD"
git checkout HEAD^ "$current_path"
git pull
timeout 10
exit