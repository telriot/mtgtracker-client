# pull official base image
FROM node:14.17.0
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
#COPY package-lock.json ./
RUN yarn install

# add app
COPY . ./
COPY ./build.sh /app
RUN chmod +x /app/build.sh
RUN sh build.sh
# start app
CMD ["yarn", "start"]