export default class ProvablyFairConsumer {
    MaxCombinedClientSeeds = 5;
    ClientSeedRange = { min: 0, max: 9999 };

    constructor(gameData, maxCombinedClientSeeds) {
        this.gameData = gameData;
        if (maxCombinedClientSeeds) {
            this.MaxCombinedClientSeeds = maxCombinedClientSeeds;
        }
    }

    addClientSeed({ name, clientSeed }) {
        const { clientSeeds } = this.gameData.pf;

        if (clientSeeds.length < this.MaxCombinedClientSeeds) {
            clientSeeds.push({ name, clientSeed });
        }
    }

    setServerSeed(serverSeed) {
        this.gameData.pf.serverSeed = serverSeed;
    }

    setServerSeedHash(serverSeedHash) {
        this.gameData.pf.serverSeedHash = serverSeedHash;
    }

    reset() {
        this.gameData.pf = { clientSeeds: [], serverSeed: "" };
    }

    updateClientSeeds(clientSeeds) {
        this.gameData.pd.clientSeeds = clientSeeds;
    }
}
