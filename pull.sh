current_path="$PWD"
git checkout HEAD^ "$current_path"
git stash
git pull -f
sleep 5