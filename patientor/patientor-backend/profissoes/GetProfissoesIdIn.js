import { promisify } from 'util';
import redis from '../../lib/Redis';

import { profissionalRespository } from '../../repository/profissoes/ProfissoesRepository';

class GetProfissoesIdsIn {
  async run(params, transaction) {
    const ids = params.ids || [];
    if (ids.length === 0) {
      return [];
    }
    const allServices = await promisify(redis.get).bind(redis)(
      `services:IdsIn:${ids.sort().join(',')}`
    );

    if (allServices) {
      return JSON.parse(allServices);
    }

    const allProfissoes = await profissionalRespository.getProfissoesIdsIn(params, transaction);
    const timeCache = 86400;
    await promisify(redis.setex).bind(redis)(
      `services:IdsIn:${ids.sort().join(',')}`,
      timeCache,
      JSON.stringify(allProfissoes)
    );

    return allProfissoes;
  }
}

export const getProfissoesIdsIn = new GetProfissoesIdsIn();
