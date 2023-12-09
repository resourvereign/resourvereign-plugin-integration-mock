import { randomBytes } from 'crypto';

import { Logger } from '@resourvereign/plugin-types/logger.js';
import { Err, Ok, PluginSchema } from '@resourvereign/plugin-types/plugin/index.js';
import {
  Booking as IntegrationBooking,
  IntegrationPlugin,
} from '@resourvereign/plugin-types/plugin/integration.js';

const schema: PluginSchema = {
  properties: {
    bookSuccess: {
      type: 'boolean',
      metadata: {
        label: 'Success on booking',
      },
    },
    cancelSuccess: {
      type: 'boolean',
      metadata: {
        label: 'Success on cancellation',
      },
    },
  },
};

type MockInitData = {
  bookSuccess: boolean;
  cancelSuccess: boolean;
};

type MockBookId = string;

type Booking = IntegrationBooking<MockBookId>;

const initialize = async ({ bookSuccess, cancelSuccess }: MockInitData, logger: Logger) => {
  return {
    async validate() {
      logger.debug(`Starting validation`);
      return true;
    },
    async book(date: Date) {
      logger.debug(`Starting to book a resource on ${date}`);
      const randomId = randomBytes(8).toString('hex');
      const randomDescription = randomBytes(2).toString('hex');

      const result = { id: randomId, description: randomDescription };

      logger.debug(
        bookSuccess
          ? `Booking succeeded as per configuration with result ${JSON.stringify(result)}`
          : `Booking failed as per configuration`,
      );
      return bookSuccess ? Ok(result) : Err(new Error('Booking failed'));
    },

    async cancel(booking: Booking) {
      logger.debug(`Starting to cancel a resource with id ${JSON.stringify(booking)}`);
      logger.debug(
        cancelSuccess
          ? `Cancellation succeeded as per configuration`
          : `Cancellation failed as per configuration`,
      );
      return cancelSuccess ? Ok(true) : Err(new Error('Cancellation failed'));
    },
  };
};

export default {
  schema,
  initialize,
} satisfies IntegrationPlugin<MockBookId, MockInitData>;
