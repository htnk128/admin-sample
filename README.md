# admin-sample

Admin sample

## 前提条件
- Dockerのインストール
- Visual Studio Codeのインストール

## セットアップ

1. VSCodeに拡張機能のRemote Developmentを入れる
1. Gitリポジトリをクローンする
1. VSCodeでクローンしたディレクトリを開く
1. 右下に`Reopen in Container`が表示されるのでクリックし、コンテナのインストール完了まで待機する

## ローカル実行
1. 管理画面側より呼び出す[API](https://github.com/htnk128/kotlin-ddd-sample#run-application)を予め起動する
1. VSCodeのターミナルを新規に開き、以下を実行する
    ```bash
    $ yarn install
    $ yarn dev
    ```
1. http://localhost:3000/ にアクセスする

## ビルド

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```
