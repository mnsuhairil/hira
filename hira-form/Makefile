DOCKER_BASE=docker.tuxuri.com/tulus/hira-form
DOCKER_TAG=build${BUILD_NUMBER}
DOCKER_IMAGE=${DOCKER_BASE}:${DOCKER_TAG}

# .PHONY: build build-web build-go clean
.PHONY: build build-web clean deploy-staging

dev:
	yarn
	yarn start

dev2:
	cd api; go run main.go dev

all: build-web build-docker

# build: build-go build-web build-docker
build: build-web build-docker

build-web:
	docker run --rm -i \
            -v ${PWD}:/data \
            -v ${HOME}/.yarncache:/.yarncache \
			-e REACT_APP_GOOGLE_CLIENTID=${REACT_APP_GOOGLE_CLIENTID} \
			-e REACT_APP_GMAPKEY=${REACT_APP_GMAPKEY} \
			-w /data \
		node:18.16.0  sh -c ' \
            echo "@tuxuri:registry=https://npmjs.tuxuri.com/\n//npmjs.tuxuri.com/:_authToken=\"${NPM_AUTHTOKEN}\"" > /root/.npmrc && \
            yarn --cache-folder /.yarncache && \
            yarn --cache-folder /.yarncache build'

build-docker:
	docker build \
	--build-arg NPM_AUTHTOKEN=${NPM_AUTHTOKEN} \
	--build-arg REACT_APP_GOOGLE_CLIENTID=${REACT_APP_GOOGLE_CLIENTID} \
	--build-arg REACT_APP_GMAPKEY=${REACT_APP_GMAPKEY} \
	-t ${DOCKER_BASE} .
	docker tag ${DOCKER_BASE} ${DOCKER_IMAGE}
	docker push ${DOCKER_IMAGE}
	docker push ${DOCKER_BASE}:latest

test-docker:
	docker pull docker.tuxuri.com/tulus/hira-form:latest
	docker run --rm -p8888:8181 docker.tuxuri.com/tulus/hira-form:latest dev

test-docker2:
	docker-compose -d up

deploy-staging:
	kubectl --namespace hira set image deployment/infaq hira-form=${DOCKER_IMAGE}

clean:
	find ./ -name ".vscode"
