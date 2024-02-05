export default class PFGameData {
    constructor(maxCombinedClientSeeds = 5) {
        this.maxCombinedClientSeeds = maxCombinedClientSeeds;
        this.resetPF();
    }

    addPlayerToBetList(playerId, { name, amount, rate, autoCashOut }) {
        this.betList[playerId] = { time: new Date(), playerId, name, amount, rate, autoCashOut };
    }

    updatePlayerAction(playerId, action, data) {
        this.betList[playerId][action] = data;
        this.betList[playerId].time = new Date();
    }

    addClientSeed({ name, clientSeed }) {
        this.pf.clientSeeds.length < this.maxCombinedClientSeeds && this.pf.clientSeeds.push({ name, clientSeed });
    }

    setServerSeed(serverSeed) {
        this.pf.serverSeed = serverSeed;
    }

    setServerSeedHash(serverSeedHash) {
        this.pf.serverSeedHash = serverSeedHash;
    }

    resetPF() {
        this.pf = { clientSeeds: [], serverSeed: "", serverSeedHash: "" };
    }
}
