## WordPress Setup With JWT Token for Application

This documentation of the complete setup of WordPress in Docker and adding the JWT Token to refer back to if needed.

### Set up Wordpress in Docker environment...

https://docs.docker.com/compose/wordpress/

1. Create an empty project directory and navigate to the directory in terminal.
1. Create a docker-compose.yml file and add the following code...

```
version: "3.9"

services:
  db:
    image: mysql:5.7
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: somewordpress
      MYSQL_DATABASE: wordpress
      MYSQL_USER: wordpress
      MYSQL_PASSWORD: wordpress

  wordpress:
    depends_on:
      - db
    image: wordpress:latest
    ports:
      - "8000:80"
    restart: always
    environment:
      WORDPRESS_DB_HOST: db:3306
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: wordpress
      WORDPRESS_DB_NAME: wordpress
volumes:
  db_data: {}
```

1. Run `docker-compose up -d` to get the container up and running with WordPress
1. Load the Wordpress website in a browser using `http:/localhost:8000`

### Set up the JWT Token Plugin For Wordpress

https://github.com/WP-API/jwt-auth

1. Download the ZIP file from the [jwt-auth repo](https://github.com/WP-API/jwt-auth)
1. Go to the [plugins section](http://localhost:8000/wp-admin/plugins.php) of the Wordpress admin pages
1. Click on the "Add New" button
1. Click on "Upload Plugin" button and choose the zip file downloaded from the [jwt-auth repo](https://github.com/WP-API/jwt-auth).
1. Go to the Wordpress administrative panel and go to [your profile](http://localhost:8000/wp-admin/profile.php) page and scroll to the bottom where you will find a field to fill in for "New key-pair". (These are the keys to be used in your application)
1. Download the key-pair
1. Generate and download new tokens, as well by going to
    ```
    curl -X POST https://example.org/wp-json/wp/v2/token \
        -F api_key=<api key from the key-pair file> \
        -F api_secret=<api secret from the key-pair file>
    ```
