FROM node:12.18.0-alpine
WORKDIR /usr/src/app
# package.jsonとyarn.lockを/usr/src/appにコピー
COPY ./package.json .
# パッケージをインストール
RUN npm cache clean --force
RUN npm install
# ファイルを全部作業用ディレクトリにコピー
COPY . .
# コンテナを起動する際に実行されるコマンド
