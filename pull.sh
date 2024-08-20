git stash
current_path="$PWD"
git checkout HEAD^ "$current_path"
git pull -f
sleep 5