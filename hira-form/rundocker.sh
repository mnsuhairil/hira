#!/bin/sh
# export REACT_APP_LHDN_MAP=${REACT_APP_LHDN_MAP:-xREACT_APP_LHDN_MAPx}
# export REACT_APP_MAPBOX_KEY=${REACT_APP_MAPBOX_KEY:-xREACT_APP_MAPBOX_KEYx}
# export REACT_APP_LEGEND_URL=${REACT_APP_LEGEND_URL:-xREACT_APP_LEGEND_URLx}
# export REACT_APP_LHDN_PAGES=${REACT_APP_LHDN_PAGES:-xREACT_APP_LHDN_PAGESx}
# export REACT_APP_GMAPCLIENT=${REACT_APP_GMAPCLIENT:-xREACT_APP_GMAPCLIENTx}
# export REACT_APP_GMAPKEY=${REACT_APP_GMAPKEY:-xREACT_APP_GMAPKEYx}


# for fn in $(ls /usr/share/nginx/html/static/js/*.js);
# do
#     sed -r -i "s@xREACT_APP_LHDN_MAPx@${REACT_APP_LHDN_MAP}@g" $fn
#     sed -r -i "s@xREACT_APP_MAPBOX_KEYx@${REACT_APP_MAPBOX_KEY}@g" $fn
#     sed -r -i "s@xREACT_APP_LEGEND_URLx@${REACT_APP_LEGEND_URL}@g" $fn
#     sed -r -i "s@xREACT_APP_LHDN_PAGESx@${REACT_APP_LHDN_PAGES}@g" $fn
#     sed -r -i "s@xREACT_APP_GMAPCLIENTx@${REACT_APP_GMAPCLIENT}@g" $fn
#     sed -r -i "s@xREACT_APP_GMAPKEYx@${REACT_APP_GMAPKEY}@g" $fn
# done

#sed -r -i "s@PROXY_API_URL@${PROXY_API_URL}@g" /etc/nginx/conf.d/default.conf

nginx -g "daemon off;"
