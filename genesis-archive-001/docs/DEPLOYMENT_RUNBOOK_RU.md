# Пошаговый выпуск GENESIS ARCHIVE #001

Не переходите к Mainnet и минта́м, пока не выполнены все проверки.

## 1. Проверка IPFS artwork

Владелец предоставил CID:

`bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia`

Шлюз ipfs.io ответил HTTP 429 (rate limit). Это не доказывает, что CID неверный. Используйте независимый шлюз:

    curl -fL --retry 2 --retry-delay 3 "https://dweb.link/ipfs/bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia" -o /tmp/genesis.png

Если не получилось, попробуйте:

    curl -fL --retry 2 --retry-delay 3 "https://gateway.pinata.cloud/ipfs/bafybeib6huv4ptfmmjmgwhmhvmujqflmxm4hzlamujnnii5lkujopa4zia" -o /tmp/genesis.png

Проверка:

    file /tmp/genesis.png
    sha256sum /tmp/genesis.png

Ожидаемый SHA-256:

`087d6986e5e9e972e854ad6f2558ad26e2ad244a98a6e60e25a677fb9286b5bc`

## 2. Финальные метаданные — обязательно перезагрузить

Предыдущий CID метаданных, присланный ранее, НЕ соответствует точным байтам финального JSON в GitHub. Не используйте его в контракте.

Скачайте новый файл `GENESIS_ARCHIVE_001_metadata_1_FINAL.json` из сообщения проекта и загрузите его отдельным файлом в Pinata. Получите новый CID.

SHA-256 точного финального файла:

`36cc5843ee29e5ad8c449c75575af3c5ecc3432cbbb8a5da8ed112396864f0bf`

CIDv1/raw, вычисленный для этого точного файла (если провайдер сохраняет raw codec):

`bafkreibwzrmeh3rj4wwyyre4ovlvv46f5tbuglf3xcs5vdwrci4wqzhqx4`

Pinning-провайдер может выдать CID другого codec. Важна проверка скачанных байтов по SHA-256.

После получения нового CID проверьте его через независимый gateway и сравните:

    sha256sum /tmp/1.json
    python3 -m json.tool /tmp/1.json

## 3. Локальная сборка и тесты

В каталоге genesis-archive-001:

    npm install
    npm run compile
    npm test

В Ubuntu ARM64 владельца уже успешно прошли компиляция 19 Solidity-файлов и 11 Hardhat-тестов. Не запускайте npm audit fix --force.

## 4. Sepolia

Только после проверки обоих IPFS объектов:

1. Скопируйте env.template в локальный .env.
2. Укажите DEPLOYER_KEY тестового кошелька, SEPOLIA_RPC_URL, новый METADATA_URI и ROYALTY_RECEIVER.
3. Выполните npm run deploy:sepolia.
4. Сохраните адрес контракта и hash транзакции.
5. Проверьте chain ID 11155111, owner, name, symbol, metadataURI и royaltyInfo.
6. Укажите NFT_CONTRACT_ADDRESS и MINT_RECIPIENT.
7. Только после проверки выполните npm run mint:sepolia.

Не отправляйте приватные ключи или seed-фразы в чат или GitHub.

## 5. Mainnet

Mainnet допустим только после успешного Sepolia, независимого code review, юридической проверки, окончательной проверки IPFS и явного согласования адресов и расходов. Ни один Mainnet deployment или mint пока не выполнялся.
