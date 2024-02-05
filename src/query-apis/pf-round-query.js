export default class PFRoundQuery {
    constructor(roundsRepository, resultsRepository) {
        this.roundsRepository = roundsRepository;
        this.resultsRepository = resultsRepository;
    }

    convertSettlementResult(roundResult) {
        return roundResult;
    }

    convertResult(round) {
        return round;
    }

    async getList(limit, projections) {
        const rounds = await this.roundsRepository
            .find({}, projections, { sort: { id: -1 }, limit: limit })
            .lean()
            .exec();

        const results = await this.resultsRepository
            .find({}, { _id: false, time: false, _v: false }, { sort: { roundId: -1 }, limit: limit + 1 })
            .lean()
            .exec();

        return rounds.map((round) => {
            const roundResults = results.find((result) => result.roundId === round.id);
            const result = round.result ?? this.convertResult(round);
            const settlementResult = round.settlementResult ?? this.convertSettlementResult(round.result);

            return {
                roundId: round.id,
                result,
                settlementResult,
                pf: {
                    ...roundResults,
                    result,
                },
            };
        });
    }

    async getOne(id, projections = { _id: false }) {
        const round = await this.roundsRepository.findOne({ id }, projections).lean().exec();
        const pfResult = await this.resultsRepository.findOne({ roundId: id }, { _id: false, time: false, _v: false }).lean().exec();

        round.result = round.result ?? this.convertResult(round);
        round.settlementResult = round.settlementResult ?? this.convertSettlementResult(round.result);
        round.pf = {
            result: round.result,
            ...pfResult,
        };

        return round;
    }
}
