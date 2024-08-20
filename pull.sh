current_path="$PWD"
git checkout HEAD^ "$current_path"
git stash
git pull -f
sh .sh