export default class PFRoundResultPublisher {
  constructor(gameData, publisher) {
    this.publisher = publisher;
    this.gameData = gameData;
  }

  publishRoundResult(roundResult) {
    const payload = { finish: roundResult };

    if (this.gameData.pf) {
      this.publisher.publishToAllUsers({
        ...payload,
        pf: {
          ...this.gameData.pf,
          roundId: this.gameData.roundId,
          result: this.gameData.result,
        },
      });
    } else {
      this.publisher.publishToAllUsers(payload);
    }

    this.publisher.publishToAllAdmins(payload);
  }

  publishServerSeedHash() {
    const { serverSeedHash } = this.gameData.pf;

    if (serverSeedHash) {
      const pf = { serverSeedHash, roundId: this.gameData.roundId };

      this.publisher.publishToAllUsers({ pf });
    }
  }

  publishWinners(roundId, winningPlayers) {
    const payload = {
      roundId,
      winningPlayers,
    };

    this.publishToAllUsers({
      winners: payload,
    });
  }
}
