import { promisify } from 'util';
import redis from '../../lib/Redis';

import { profissionalRespository } from '../../repository/profissoes/ProfissoesRepository';

class GetAllProfissoes {
  async run(params, transaction) {
    const cacheKey = `services:all`;
    const allServices = await promisify(redis.get).bind(redis)(cacheKey);

    if (allServices) {
      return JSON.parse(allServices);
    }

    const allProfissoes = await profissionalRespository.allProfissoes(params, transaction);
    const timeCache = 86400;
    await promisify(redis.setex).bind(redis)(cacheKey, timeCache, JSON.stringify(allProfissoes));

    return allProfissoes;
  }
}

export const getAllProfissoes = new GetAllProfissoes();
