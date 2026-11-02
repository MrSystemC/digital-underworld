# Build from Android / Termux

The project currently targets Node.js 20–22 and Hardhat 2.28.0. The Android Termux runtime reports Node.js 26 and may not receive the platform-specific optional native packages expected by Hardhat's toolchain. The Hardhat toolbox / Ignition aggregate plugin has been removed; this project now loads only ethers, Chai matchers and verify plugins. For a reproducible build, use Ubuntu in proot with Node.js 22.

## 1. Install Ubuntu in Termux

Run in Termux:

    pkg update -y
    pkg install proot-distro -y
    proot-distro install ubuntu
    proot-distro login ubuntu

## 2. Install Node.js 22 and Git inside Ubuntu

Run after the Ubuntu shell opens:

    apt update
    apt install -y ca-certificates curl git build-essential
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
    apt install -y nodejs
    node -v
    npm -v

Confirm node -v reports v22.x.

## 3. Clone the updated source branch

    git clone -b genesis-archive-001 --single-branch https://github.com/MrSystemC/digital-underworld.git
    cd digital-underworld/genesis-archive-001

## 4. Install, compile and test

    npm install
    npm run compile
    npm test

Do not use npm install --force or --legacy-peer-deps. Do not run deployment or mint commands until both compilation and tests pass.

No wallet key or RPC credentials are needed for install, compile or tests. Do not put a private key in the repository or send it through chat.
