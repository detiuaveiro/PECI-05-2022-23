IN=$(hostname -I)
arrIN=(${IN// / })
echo ${arrIN[0]} 
