# baldercm/zmq-poc Makefile

default: dev-install

dev-install:
	npm cache clean
	npm install --global nodemon jshint
	npm install

.PHONY: test
