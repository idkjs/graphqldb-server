import moment from 'moment';

const openingHours = {
  specialdays: [
    // special days e.g. Christmas
    {
      date: '25/12',
      open: [
        {
          start: '09:00',
          end: '18:00',
        },
      ],
    },
  ],
  normaldays: {
    mon: [
      {
        start: '09:00',
        end: '18:00',
      },
      {
        start: '21:00',
        end: '02:00',
      },
    ],
    tue: [
      {
        start: '09:00',
        end: '18:00',
      },
    ],
    wed: [
      {
        start: '09:00',
        end: '18:00',
      },
    ],
    thu: [
      {
        start: '09:00',
        end: '18:00',
      },
    ],
    fri: [
      {
        start: '09:00',
        end: '18:00',
      },
    ],
    sat: [
      {
        start: '09:00',
        end: '18:00',
      },
    ],
    sun: [
      {
        start: '09:00',
        end: '18:00',
      },
    ],
  },
};

const now = moment();
const ddd = now.format('ddd').toLowerCase();

openingHours.specialdays.map(specialDay => {
  if (specialDay.date === now.format('DD/MM')) {
    // is it opened or closed now?
  } else {
    openingHours.normaldays[ddd].map(hours => {
      // is is opened or closed now?
    });
  }
});
