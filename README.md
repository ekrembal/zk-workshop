# 	Developing ZK Circuits with Circom

## Pre requisites

* Install rust and [circom2](https://docs.circom.io/getting-started/installation/)

## Getting started

1. Clone or fork this template repository.
    ```shell
    git clone https://github.com/ekrembal/zk-workshop
    ```
2. Install packages
    ```shell
    yarn
    ```
3. Build: this compiles the circuits and exports artifacts. Then compiles the contracts and generate typescript clients.
    ```shell
    yarn build
    ```
4. Enter your private key in `contracts/.env` file.
    ```shell
    yarn demo
    ```
5. Deploy the contracts
    ```shell
    yarn workspace contracts hardhat run --network goerli scripts/deploy.ts
    ```
6. Interact with the frontend  from https://zk.ekrembal.com

## Run tests
1. Test contracts
    ```shell
    yarn workspace contracts test
    ```

2. Test your circuits
    ```shell
    yarn workspace circuits test
    ```

3. Test your app
    ```shell
    yarn workspace app test
    ```
