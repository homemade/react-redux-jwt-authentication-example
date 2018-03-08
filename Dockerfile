FROM phusion/baseimage:0.10.0

# Add basic dependencies
RUN apt-get update && apt-get install -y \
		ca-certificates curl gcc libc6-dev make \
		bzr git mercurial \
		g++ \
		curl \
    zip unzip \
    python2.7 \
    wget \
		--no-install-recommends

# Add Node, Typescript, webpack and yarn
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
	&& apt-get install -y nodejs \
	&& npm install -g typescript \
	&& npm install -g webpack

# Add yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
	&& echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
	&& apt-get update && apt-get install yarn

ENTRYPOINT ["/sbin/my_init"]
