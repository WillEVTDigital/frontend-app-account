import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';
import { Form, Hyperlink, StatefulButton } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import messages from './messages';
import { editableFieldSelector } from '../data/selectors';

const MarketingPreferencesSection = (props) => {
  const {
    className, errorMessage, onChange, onSubmit, isRequired, name, options, value, saveState,
  } = props;

  const handleFocus = (e) => {
    if (props.handleFocus) { props.handleFocus(e); }
  };

  const handleOnBlur = (e) => {
    if (props.handleBlur) { props.handleBlur(e); }
  };

  const generateNewMarketingPreferences = (e) => {
    const prevMarketingPreferences = value || [];
    if (e.target.checked && (!prevMarketingPreferences.includes(e.target.value))) {
      return [...prevMarketingPreferences, e.target.value];
    }
    return prevMarketingPreferences.filter(pref => pref !== e.target.value);
  };

  const handleChange = (e) => {
    onChange(name, generateNewMarketingPreferences(e));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, generateNewMarketingPreferences(e));
  };

  const { formatMessage } = useIntl();

  const selectedValues = Array.isArray(value) ? value : [];

  return (

    <form onSubmit={handleSubmit}>
      <Form.Group isInvalid={!!(isRequired && errorMessage)}>
        <Form.CheckboxSet
          name={name}
          onChange={(e) => handleChange(e)}
          value={selectedValues}
          aria-invalid={isRequired && Boolean(errorMessage)}
          onBlur={handleOnBlur}
          onFocus={handleFocus}
        >
          {options.map(option => (
            <Form.Checkbox
              key={option.value}
              className={className}
              id={option.value}
              value={option.value}
            >
              {option.label}
            </Form.Checkbox>
          ))}
        </Form.CheckboxSet>
        {isRequired && errorMessage && (
        <Form.Control.Feedback id={`${name}-error`} type="invalid" className="form-text-size" hasIcon={false}>
          {errorMessage}
        </Form.Control.Feedback>
        )}
        {name === 'marketing_preferences'
        && (
          <p className="mt-2 x-small">
            {
              formatMessage(
                messages.marketingDisclaimer,
                {
                  privacyPolicyLink: (
                    <Hyperlink
                      isInline
                      variant="muted"
                      destination={`${getConfig().MARKETING_SITE_BASE_URL}/privacy-policy`}
                      target="_blank"
                      showLaunchIcon={false}
                    >
                      {formatMessage(messages.marketingPrivacyPolicyLink)}
                    </Hyperlink>
                  ),
                },
              )
            }
          </p>
        )}
      </Form.Group>
      <p>
        <StatefulButton
          type="submit"
          className="mr-2"
          state={saveState}
          labels={{
            default: saveState === 'pending' ? formatMessage(messages.actionPending) : formatMessage(messages.actionSave),
          }}
          onClick={(e) => {
            if (saveState === 'pending') { e.preventDefault(); }
          }}
        />
      </p>
    </form>
  );
};

MarketingPreferencesSection.defaultProps = {
  className: '',
  value: '',
  saveState: undefined,
  handleBlur: null,
  handleFocus: null,
  errorMessage: '',
  isRequired: false,
};

MarketingPreferencesSection.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
  saveState: PropTypes.oneOf(['default', 'pending', 'complete', 'error']),
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default connect(editableFieldSelector)(MarketingPreferencesSection);
