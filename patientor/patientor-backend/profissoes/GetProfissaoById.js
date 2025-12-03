import { promisify } from 'util';
import redis from '../../lib/Redis';

import { profissionalRespository } from '../../repository/profissoes/ProfissoesRepository';

class GetProfissaoById {
  async run(params, transaction) {
    const id = params.id;
    if (ids.length === 0) {
      return [];
    }
    const allServices = await promisify(redis.get).bind(redis)(`service:id:${id}`);

    if (allServices) {
      return JSON.parse(allServices);
    }

    const allProfissoes = await profissionalRespository.getById(params, transaction);
    const timeCache = 86400;
    await promisify(redis.setex).bind(redis)(`service:id:${id}`, timeCache, JSON.stringify(allProfissoes));

    return allProfissoes;
  }
}

export const getProfissaoById = new GetProfissaoById();
