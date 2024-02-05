export default class PFGameData {
    constructor(maxCombinedClientSeeds = 5) {
        this.maxCombinedClientSeeds = maxCombinedClientSeeds;
        this.resetPF();
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
