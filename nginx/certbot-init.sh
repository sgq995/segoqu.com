#!/bin/sh

domains() {
  domain_list=$(
    ls /etc/nginx/conf.d | sort -n | sed 's/.*/\/etc\/nginx\/conf.d\/&/' \
    | xargs grep -RiIh server_name \
    | sed -e ':a;N;$!ba;s/\([^;\{\}]\)\n/\1 /g' | grep -E 'server_name[ \s\t]' \
    | grep -v '\$' | grep '\.' \
    | sed -r -e 's/(\S)[ \t]+(\S)/\1\n\2/g' -e 's/[\t ]//g' -e 's/;//' -e 's/server_name//' \
    | sed '/^[[:space:]]*$/d' | uniq | sed 's/.*/-d &/' | tr '\n' ' '
  )
}

main() {
  until [ -f /var/run/nginx.pid ]
  do
    sleep 5
  done

  domains
  echo $domain_list

  echo $domain_list \
    | xargs certbot --nginx \
      -m "sgq995@gmail.com" \
      --agree-tos \
      --eff-email \
      --reinstall
      # --hsts \
      # --uir
}

main &
