import {
  Injectable,
  InternalServerErrorException,
  // NotFoundException,
} from '@nestjs/common';

import * as elasticsearch from 'elasticsearch';

import { Post } from '../../model/post.model';
@Injectable()
export class ElasticSearchService {
  private readonly esclient: elasticsearch.Client;
  constructor() {
    this.esclient = new elasticsearch.Client({
      host: process.env.ELASTIC_SEARCH_URL,
      ssl: { rejectUnauthorized: false }, //for calling https
    });
  }

  async hasIndex(index: string) {
    try {
      return await this.esclient.indices.exists({
        index,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createIndex(indexName: string): Promise<void> {
    try {
      await this.esclient.indices.create({
        index: indexName,
        body: {
          settings: {
            analysis: {
              filter: {
                autocomplete_filter: {
                  type: 'edge_ngram',
                  min_gram: 1,
                  max_gram: 10,
                },
              },
              analyzer: {
                autocomplete: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase', 'autocomplete_filter'],
                },
              },
            },
          },
          mappings: {
            properties: {
              description: {
                type: 'text',
                analyzer: 'autocomplete',
                search_analyzer: 'standard',
              },
            },
          },
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteIndex(index: string): Promise<void> {
    try {
      await this.esclient.indices.delete({
        index,
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async insertDocumentIntoIndex(index: string, post: Post): Promise<void> {
    try {
      const esData = [
        {
          index: {
            _index: index,
            _id: post.id,
          },
        },
        {
          description: post.description,
        },
      ];

      await this.esclient.bulk({
        index,
        body: esData,
        type: 'text',
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findDocumentById(_id: string) {
    try {
      return await this.esclient.search({
        index: 'posts',
        body: {
          query: {
            match: { _id },
          },
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async updateDocumentOfAnIndex(id: string, description: string) {
    try {
      const response = await this.esclient.update({
        index: 'posts',
        type: 'text',
        id,
        body: {
          doc: {
            description,
          },
        },
      });
      console.log(response);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
  async searchDocumentFromIndex(index: string, query: string) {
    try {
      const { hits } = await this.esclient.search({
        index,
        body: {
          query: {
            match: { description: query },
          },
        },
      });

      return hits.hits;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
