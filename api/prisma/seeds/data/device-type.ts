import { Prisma, DeviceTypeActionInput } from '@prisma/client';

const deviceTypeOnOffActions: Prisma.DeviceTypeActionCreateManyDeviceTypeInput[] =
  [
    {
      action: 'on',
      label: 'On',
    },
    {
      action: 'off',
      label: 'Off',
    },
  ];

export const deviceTypeData: Prisma.DeviceTypeUpsertArgs[] = [
  {
    where: { type: 'switch' },
    update: {},
    create: {
      title: 'Switch',
      type: 'switch',
      icon: 'smart-switch',
      actions: {
        createMany: {
          data: deviceTypeOnOffActions,
        },
      },
    },
  },
  {
    where: { type: 'plug' },
    update: {},
    create: {
      title: 'Plug',
      type: 'plug',
      icon: 'smart-plug',
      actions: {
        createMany: {
          data: deviceTypeOnOffActions,
        },
      },
    },
  },
  {
    where: { type: 'led_rgb' },
    update: {},
    create: {
      title: 'RGB Led',
      type: 'led_rgb',
      icon: 'smart-bulb',
      actions: {
        createMany: {
          data: [
            ...deviceTypeOnOffActions,
            {
              action: 'color',
              label: 'Color',
              input: [DeviceTypeActionInput.COLOR_WHEEL],
            },
          ],
        },
      },
    },
  },
  {
    where: { type: 'led_rgbw' },
    update: {},
    create: {
      title: 'RGBW Led',
      type: 'led_rgbw',
      icon: 'smart-bulb',
      actions: {
        createMany: {
          data: [
            ...deviceTypeOnOffActions,
            {
              action: 'color',
              label: 'Color',
              input: [DeviceTypeActionInput.COLOR_WHEEL],
            },
          ],
        },
      },
    },
  },
  {
    where: { type: 'speaker' },
    update: {},
    create: {
      title: 'Speaker',
      type: 'speaker',
      icon: 'smart-speaker',
      actions: {
        createMany: {
          data: [
            {
              action: 'controls',
              label: 'Music Controls',
              input: [DeviceTypeActionInput.MEDIA_CONTROL],
            },
          ],
        },
      },
    },
  },
  {
    where: { type: 'curtain' },
    update: {},
    create: {
      title: 'Curtain',
      type: 'curtain',
      icon: 'smart-curtain',
      actions: {
        createMany: {
          data: [
            {
              action: 'open',
              label: 'Open',
            },
            {
              action: 'close',
              label: 'Close',
            },
          ],
        },
      },
    },
  },
];
