import React from 'react';

import { FormattedMessage } from 'react-intl';

const ConfirmEmailMessage = () => (
  <div className="alert alert-warning">
    <FormattedMessage id="messages.confirmEmail" />
  </div>
);

export default ConfirmEmailMessage;
