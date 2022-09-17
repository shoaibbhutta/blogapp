import { Module } from '@nestjs/common';

import { ElasticsearchModule } from '@nestjs/elasticsearch';
// import * as elasticsearch from 'elasticsearch';
import { ElasticSearchService } from './elastic-search.service';
// import { ElasticSearchProvider } from './elastic-search-provider';

@Module({
  providers: [ElasticSearchService, ElasticsearchModule],
  exports: [ElasticSearchService],
  imports: [
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    }),
  ],
})
export class ElasticSearchModule {}
