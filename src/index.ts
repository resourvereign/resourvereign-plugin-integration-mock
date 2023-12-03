import { Logger } from '@resourvereign/plugin-types/logger.js';
import { PluginSchema } from '@resourvereign/plugin-types/plugin/index.js';
import { IntegrationPlugin } from '@resourvereign/plugin-types/plugin/integration.js';

const schema: PluginSchema = {
  properties: {
    success: {
      type: 'boolean',
    },
  },
};

type MockInitData = {
  success: boolean;
};

const initialize = async ({ success }: MockInitData, logger: Logger) => {
  return {
    async validate() {
      logger.debug(`Starting validation`);
      return true;
    },
    async book(date: Date) {
      logger.debug(`Starting to book a resource on ${date}`);
      return success;
    },
  };
};

export default {
  schema,
  initialize,
} satisfies IntegrationPlugin<MockInitData>;
