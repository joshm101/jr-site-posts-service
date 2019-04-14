./stop-containers.sh
docker build -t jr-site-posts-service-dev .
docker run \
--env JR_SITE_DEV_DB_CONNECTION_URI=${JR_SITE_DEV_DB_CONNECTION_URI} \
--env JR_SITE_DEV_DB_CONNECTION_USERNAME=${JR_SITE_DEV_DB_CONNECTION_USERNAME} \
--env JR_SITE_DEV_DB_CONNECTION_PASSWORD=${JR_SITE_DEV_DB_CONNECTION_PASSWORD} \
-p 3015:3015 -d --name jr-site-posts-service-dev-container jr-site-posts-service-dev

docker logs -f jr-site-posts-service-dev-container
