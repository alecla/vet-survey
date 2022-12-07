import { renderStarIcon } from './utils';

//add types

export default [
  {
    defaultValue: null,
    label: '1. How did you hear about us?',
    type: 'radio',
    variant: 'outline-success',
    name: 'group-how-did-you-hear-about-us',
    id: 'radio-hear-about-us',
    order: 1,
    fields: [
      {
        label: 'Word of mouth',
        value: 'Word of mouth'
      },
      {
        label: 'Social media',
        value: 'Social media'
      },
      {
        label: 'Search engine',
        value: 'Search engine'
      },
      {
        label: 'Email or newsletter',
        value: 'Email or newsletter'
      },
      {
        label: 'Other',
        value: 'Other'
      }
    ]
  },
  {
    defaultValue: null,
    label: '2. How would you rate your overall satisfaction from 1 - worst to 5 - excellent?',
    type: 'radio',
    variant: 'outline-success',
    name: 'group-overall-satisfaction',
    id: 'radio-overall-satisfaction',
    order: 2,
    fields: [
      {
        label: renderStarIcon(1),
        value: '1'
      },
      {
        label: renderStarIcon(2),
        value: '2'
      },
      {
        label: renderStarIcon(3),
        value: '3'
      },
      {
        label: renderStarIcon(4),
        value: '4'
      },
      {
        label: renderStarIcon(5),
        value: '5'
      }
    ]
  },
  {
    defaultValue: null,
    label: '3. What was your opinion of the staff at the clinic?',
    type: 'checkbox',
    variant: 'success',
    name: 'group-opinion-staff',
    id: 'checkbox-opinion-staff',
    order: 3,
    fields: [
      {
        label: 'Nice',
        value: 'Nice'
      },
      {
        label: 'Helpful',
        value: 'Helpful'
      },
      {
        label: 'Accommodating',
        value: 'Accommodating'
      },
      {
        label: 'Unpleasant',
        value: 'Unpleasant'
      },
      {
        label: 'Unprofessional',
        value: 'Unprofessional'
      }
    ]
  },
  {
    defaultValue: null,
    label: '4. Would you recommend us to a friend or collegue?',
    type: 'radio',
    variant: 'outline-success',
    name: 'group-recommend-us',
    id: 'radio-recommend-us',
    order: 4,
    fields: [
      {
        label: 'Yes',
        value: 'Yes'
      },
      {
        label: 'No',
        value: 'No'
      }
    ]
  },
  {
    label: '5. Were our prices reasonable for the treatment required?',
    name: 'group-prices-reasonable',
    order: 5,
    type: 'range',
    fields: [
      {
        label: 'Unreasonable',
        value: '1'
      },
      {
        label: 'Unaffordable',
        value: '2'
      },
      {
        label: 'Affordable',
        value: '3'
      },
      {
        label: 'Reasonable',
        value: '4'
      }
    ]
  },
  {
    label:
      '6. How do you think we should improve our services in future? Please tell us',
    name: 'group-improve-how',
    order: 6,
    type: 'textarea'
  }
];
