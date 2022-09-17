import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';

export const ElasticSearchProvider = {
  provide: 'ELASTICSEARCH',
  useFactory: async (configService: ConfigService) => {
    const client = new Client({ node: configService.get('ELASTICSEARCH_URL') });
    return client;
  },
  inject: [ConfigService],
};
