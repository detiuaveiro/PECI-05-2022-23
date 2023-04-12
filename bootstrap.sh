#!/usr/bin/env bash

apt-get update
apt-get install -y apache2

cp /vagrant/index.html /var/www/html