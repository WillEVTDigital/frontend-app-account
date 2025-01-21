import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  marketingDetails: {
    id: 'marketingPreferences.marketingDetails',
    description: 'Description of the marketing communications available',
    defaultMessage: 'I would like the following updates by email:',
  },
  actionSave: {
    id: 'marketingPreferences.action.save',
    description: 'Update marketing preferences button',
    defaultMessage: 'Update Preferences',
  },
  actionPending: {
    id: 'marketingPreferences.action.pending',
    description: 'Update marketing preferences button submission pending',
    defaultMessage: 'Updating',
  },
  marketingDisclaimer: {
    id: 'marketingPreferences.marketingDisclaimer',
    description: 'Details about unsubscribing and privacy policy.',
    defaultMessage: 'For more information on our privacy practices, '
      + 'and how we are committed to protecting and respecting your privacy, '
      + 'please review our {privacyPolicyLink}.',
  },
  marketingPrivacyPolicyLink: {
    id: 'marketingPreferences.marketingPrivacyPolicyLink',
    description: 'Privacy Policy',
    defaultMessage: 'Privacy Poicy',
  },
});

export default messages;
