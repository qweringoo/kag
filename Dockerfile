FROM reactnativecommunity/react-native-android:latest

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g eas-cli

CMD ["eas", "build", "--platform", "android", "--profile", "preview", "--local"]