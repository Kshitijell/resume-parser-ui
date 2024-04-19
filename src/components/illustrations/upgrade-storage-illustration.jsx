import { memo } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
//
import BackgroundShape from './background-shape';

function UpgradeStorageIllustration({ ...other }) {
  const theme = useTheme();

  const PRIMARY_LIGHTER = theme.palette.primary.lighter;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box
      component="svg"
      width="100%"
      height="100%"
      viewBox="0 0 480 360"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <BackgroundShape />

      <image href="/assets/illustrations/characters/character_2.png" height="300" x="322" y="30" />

      <path
        fill={PRIMARY_MAIN}
        d="M70.6 79.545c0-2.7.7-5.4 2-7.8 1.3-2.4 3.1-4.4 5.4-5.9 2.3-1.5 4.9-2.4 7.6-2.7 2.7-.3 5.4.1 8 1.1 1.8-3.8 4.8-6.8 8.499-8.8 3.7-2 7.9-2.8 12-2.3s8 2.3 11.1 5.1c3.1 2.8 5.3 6.5 6.2 10.6 4.5.3 8.7 2.3 11.7 5.7 3 3.3 4.6 7.7 4.5 12.2-.1 4.5-2 8.7-5.2 11.9-3.2 3.1-7.5 4.9-12 4.9h-55.5c-2.9 0-5.7-1-7.9-2.8-2.2-1.8-3.7-4.4-4.2-7.2s0-5.7 1.4-8.3c1.4-2.7 3.7-4.7 6.4-5.7zm195.699 136c0-1.7.4-3.3 1.2-4.8.8-1.5 1.9-2.7 3.3-3.7 1.4-.9 3-1.5 4.7-1.7 1.7-.2 3.4.1 4.9.7 1.1-2.3 3-4.2 5.2-5.5 2.2-1.3 4.9-1.7 7.4-1.4 2.6.3 5 1.4 6.9 3.1 1.9 1.7 3.2 4 3.8 6.5 2.8.2 5.4 1.4 7.2 3.5 1.9 2.1 2.9 4.8 2.8 7.5-.1 2.8-1.3 5.4-3.3 7.3-2 1.9-4.7 3-7.5 3h-34c-1.8 0-3.5-.6-4.8-1.8-1.4-1.1-2.3-2.7-2.6-4.4-.3-1.7 0-3.5.8-5.1 1-1.3 2.4-2.5 4-3.2zm-184.2-30.4c0-2.9.7-5.7 2.1-8.2 1.4-2.5 3.3-4.7 5.7-6.2 2.4-1.6 5.1-2.6 7.9-2.9 2.8-.3 5.7.1 8.3 1.2 1.9-3.9 5-7.2 8.9-9.3 3.8-2.1 8.2-3 12.6-2.4 4.4.5 8.4 2.4 11.7 5.3 3.2 2.9 5.5 6.8 6.5 11.1 4.8.2 9.4 2.2 12.7 5.7 3.3 3.5 5.1 8.2 4.9 13-.2 4.8-2.2 9.4-5.7 12.7-3.5 3.3-8.2 5.1-13 4.9h-58c-3 0-5.9-1.1-8.2-3-2.3-1.9-3.9-4.6-4.4-7.6-.5-3 0-6 1.4-8.6 1.4-2.6 3.8-4.6 6.6-5.7zm180.4-84.4c0-2 .5-3.9 1.5-5.6.9-1.7 2.3-3.2 3.9-4.3 1.6-1.1 3.5-1.8 5.5-2 2-.2 3.9.1 5.8.8 1.3-2.7 3.5-4.9 6.1-6.4 2.7-1.4 5.7-2 8.7-1.7 3 .4 5.8 1.6 8.1 3.7 2.3 2 3.8 4.7 4.5 7.6 3.3.1 6.5 1.5 8.8 4 2.3 2.4 3.5 5.7 3.4 9-.1 3.3-1.5 6.5-4 8.8-2.4 2.3-5.7 3.5-9 3.4h-40.1c-2.1 0-4.1-.7-5.7-2.1-1.6-1.3-2.7-3.2-3.1-5.2-.4-2.1 0-4.2 1-6 1-1.9 2.7-3.3 4.6-4z"
        opacity="0.08"
      />

      <path
        fill={PRIMARY_DARKER}
        d="M185.3 306.145c74.7 0 135.3-3.5 135.3-7.9s-60.6-7.9-135.3-7.9c-74.7 0-135.3 3.5-135.3 7.9s60.5 7.9 135.3 7.9z"
        opacity="0.24"
      />

      <path
        fill="url(#paint0_linear_1_99)"
        d="M138.6 75.745h12.8c8 0 15.8 2.3 22.5 6.7 6.9 4.5 12.3 10.9 15.4 18.5 7.6.5 14.8 3.3 20.6 8.2 5.8 4.9 9.9 11.5 11.6 18.8 5.1 1.5 9.5 4.7 12.5 9.2 2.9 4.5 4.1 9.8 3.4 15.1-.7 5.3-3.4 10.1-7.4 13.6s-9.2 5.4-14.5 5.4h-125c-4.7.1-9.3-.8-13.6-2.5-4.3-1.7-8.3-4.3-11.6-7.6-3.3-3.3-6-7.2-7.8-11.5-1.8-4.3-2.7-8.9-2.7-13.6 0-4.7.9-9.3 2.7-13.6 1.8-4.3 4.4-8.2 7.8-11.5 3.3-3.3 7.3-5.9 11.6-7.6 4.3-1.7 9-2.6 13.6-2.5h10.2c3.1-7.4 8.4-13.8 15.1-18.2 6.8-4.5 14.7-6.9 22.8-6.9z"
      />

      <path
        fill="url(#paint1_linear_1_99)"
        d="M124.2 171.245h16.4v16.5c0 1.8-.7 3.6-2 4.9-.6.6-1.2 1-1.9 1.3v10.6c0 1-.4 1.9-1.1 2.6-.6.6-1.5 1-2.3 1.1h.8v4.2c0 4.3 1.7 8.5 4.8 11.6 3.1 3.1 7.2 4.8 11.6 4.8h36.6v3.5h-36.6c-5.3 0-10.3-2.1-14.1-5.8-3.7-3.7-5.8-8.8-5.8-14.1v-4.3h.8c-.9-.1-1.7-.4-2.3-1.1-.7-.7-1.1-1.6-1.1-2.6v-10.6c-.7-.3-1.3-.8-1.9-1.3-1.3-1.3-2-3-2-4.9v-16.4h.1z"
      />

      <path
        fill={PRIMARY_LIGHTER}
        fillRule="evenodd"
        d="M216.1 130.245l1.6.4c4.5 1.3 8.3 4.1 10.9 8 2.5 3.9 3.6 8.6 2.9 13.2-.6 4.6-2.9 8.8-6.4 11.9-3.5 3.1-8 4.7-12.7 4.7H103.3c-8.4 0-16.5-3.4-22.6-9.3-6-5.9-9.5-13.9-9.7-22.4-.2-8.4 2.9-16.6 8.6-22.7 5.8-6.2 13.7-9.9 22.2-10.4h1.5c2.9 0 5.9.4 8.7 1.2l.2.1 2.5.7.9-2.4c2.7-7 7.4-13.1 13.5-17.4 6.1-4.4 13.3-6.9 20.8-7.2 7.3.3 14.3 2.6 20.3 6.8 6 4.2 10.7 9.9 13.5 16.7l.7 1.6 1.7.1c6.9.4 13.6 3.1 18.9 7.6 5.3 4.5 9.1 10.5 10.7 17.3l.4 1.5zm-78.7 24.4v-27.7h-8.8l22.8-25.6 22.8 25.6h-8.8v27.7h-28z"
        clipRule="evenodd"
      />

      <path
        fill={PRIMARY_LIGHTER}
        d="M297.8 112.745c.2-.3.3-.6.3-1 0-.5-.2-.9-.5-1.2-.3-.3-.8-.5-1.2-.5-.3 0-.7.1-1 .3-.3.2-.5.5-.6.8-.1.3-.2.7-.1 1 .1.3.2.6.5.9.2.2.5.4.9.5.3.1.7 0 1-.1l.7-.7zm-195.2 90.5c.3-.4.4-.9.4-1.5a2.732 2.732 0 00-2.7-2.7c-.5 0-1 .2-1.5.4-.4.3-.8.7-1 1.2-.2.5-.3 1-.2 1.5.1.5.4 1 .7 1.3.4.4.8.6 1.4.7.5.1 1 .1 1.5-.1.7 0 1.1-.4 1.4-.8zm201.9-91.5c0 .3-.1.7-.3 1-.2.3-.5.5-.8.6-.3.1-.7.2-1 .1-.3-.1-.6-.2-.9-.5-.2-.2-.4-.5-.5-.9-.1-.3 0-.7.1-1 .1-.3.3-.6.6-.8.3-.2.6-.3 1-.3.5 0 .9.2 1.2.5.4.4.6.8.6 1.3zm-166.1 71.9c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2 1.2.1 2.2 1 2.2 2.2z"
        opacity="0.48"
      />

      <path
        fill={PRIMARY_LIGHTER}
        d="M291.6 111.745c0 .3-.1.7-.3 1-.2.3-.5.5-.8.6-.3.1-.7.2-1 .1-.3-.1-.6-.2-.9-.5-.2-.2-.4-.5-.5-.9-.1-.3 0-.7.1-1 .1-.3.4-.6.6-.8.3-.2.6-.3 1-.3.5 0 .9.2 1.2.5.5.4.6.8.6 1.3zm-198.5 90c0 .5-.2 1-.4 1.5-.3.4-.7.8-1.2 1-.5.2-1 .3-1.5.1-.5-.1-1-.4-1.4-.7-.4-.3-.6-.8-.7-1.3-.1-.5 0-1 .2-1.5s.5-.9 1-1.2c.4-.3.9-.4 1.5-.4.7 0 1.4.3 1.9.8.3.4.6 1 .6 1.7zm39.5-18.1c0 1.2-1 2.2-2.2 2.2-1.2 0-2.2-1-2.2-2.2 0-1.2 1-2.2 2.2-2.2 1.2 0 2.2 1 2.2 2.2z"
        opacity="0.12"
      />

      <path
        fill={PRIMARY_MAIN}
        d="M256.3 144.745h-60c-5 0-9.1 4.1-9.1 9.1v135.3c0 5 4.1 9.1 9.1 9.1h60c5 0 9.1-4.1 9.1-9.1v-135.3c0-5-4.1-9.1-9.1-9.1z"
      />

      <path
        fill={PRIMARY_DARK}
        d="M256.3 298.245h16.3c5 0 9.1-4.1 9.1-9.1v-135.3c0-5-4.1-9.1-9.1-9.1h-16.3c5 0 9.1 4.1 9.1 9.1v135.3c0 5-4.1 9.1-9.1 9.1z"
      />

      <path
        fill="#fff"
        d="M262.4 289.145v-135.3c0-3.3-2.7-6.1-6.1-6.1h-57.2c-3.3 0-6.1 2.7-6.1 6.1v135.3c0 3.3 2.7 6.1 6.1 6.1h57.2c3.3 0 6.1-2.8 6.1-6.1z"
      />

      <path
        fill={PRIMARY_MAIN}
        fillRule="evenodd"
        d="M202.5 165.545h50.4c1.2 0 2.4-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.3 0-1.3-.5-2.5-1.4-3.3-.9-.9-2.1-1.4-3.3-1.4h-50.4c-1.2 0-2.4.5-3.3 1.4-.9.9-1.4 2.1-1.4 3.3 0 1.2.5 2.4 1.4 3.3.9.9 2 1.4 3.3 1.4zm-.8-3.7h34.6c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7 0-.1 0-.3-.1-.4-.1-.1-.1-.2-.2-.3-.1-.1-.2-.2-.3-.2-.1-.1-.3-.1-.4-.1h-34.6c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7 0 .1 0 .3.1.4.1.1.1.2.2.3.1.1.2.2.3.2.2.1.3.1.4.1zm.8 18.9h50.4c1.2 0 2.4-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.3 0-1.2-.5-2.4-1.4-3.3-.9-.9-2.1-1.4-3.3-1.4h-50.4c-1.2 0-2.4.5-3.3 1.4-.9.9-1.4 2.1-1.4 3.3 0 1.3.5 2.4 1.4 3.3.8.9 2 1.4 3.3 1.4zm-.8-3.7h34.6c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.7-.3h-34.6c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7 0 .3.1.5.3.7.2.2.5.3.7.3zm.8 18.9h50.4c1.2 0 2.4-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.3 0-1.3-.5-2.5-1.4-3.3-.9-.9-2.1-1.4-3.3-1.4h-50.4c-1.3 0-2.4.5-3.3 1.4-.9.9-1.4 2.1-1.4 3.3 0 1.2.5 2.4 1.4 3.3.9.8 2 1.3 3.3 1.4zm-.8-3.7h34.6c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7 0-.1 0-.3-.1-.4-.1-.1-.1-.2-.2-.3-.1-.1-.2-.2-.3-.2-.1 0-.3-.1-.4-.1h-34.6c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7 0 .1 0 .3.1.4.1.1.1.2.2.3.1.1.2.2.3.2.2 0 .3.1.4.1zm.8 9.4h50.4c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7h-50.4c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7zm-.8 5.7h34.6c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.7-.3h-34.6c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7 0 .2.1.5.3.7.2.2.5.3.7.3zm51.2 18.9h-50.4c-1.2 0-2.4-.5-3.3-1.4-.9-.9-1.4-2.1-1.4-3.3 0-1.3.5-2.4 1.4-3.3.9-.9 2.1-1.4 3.3-1.4h50.4c1.3 0 2.5.5 3.3 1.4.9.9 1.4 2.1 1.4 3.3 0 1.2-.5 2.4-1.4 3.3-.8.9-2 1.4-3.3 1.4zm-16.6-3.7h-34.6c-.1 0-.3 0-.4-.1-.1-.1-.2-.1-.3-.2-.1-.1-.2-.2-.2-.3-.1-.1-.1-.3-.1-.4 0-.1 0-.3.1-.4.1-.1.1-.2.2-.3.1-.1.2-.2.3-.2.1-.1.3-.1.4-.1h34.6c.1 0 .3 0 .4.1.1.1.2.1.3.2.1.1.2.2.2.3.1.1.1.3.1.4 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3zm-33.8 18.9h50.4c1.3 0 2.5-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.3 0-1.2-.5-2.4-1.4-3.3-.9-.9-2.1-1.4-3.3-1.4h-50.4c-1.2 0-2.4.5-3.3 1.4-.9.9-1.4 2.1-1.4 3.3 0 1.2.5 2.4 1.4 3.3.8.8 2 1.3 3.3 1.4zm-.8-3.7h34.6c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.7-.3h-34.6c-.1 0-.3 0-.4.1-.1.1-.2.1-.3.2-.1.1-.2.2-.2.3-.1.1-.1.3-.1.4 0 .3.1.5.3.7.2.2.5.3.7.3zm51.2 18.8h-50.4c-1.2 0-2.4-.5-3.3-1.4-.9-.9-1.4-2.1-1.4-3.3 0-1.3.5-2.4 1.4-3.3.9-.9 2.1-1.4 3.3-1.4h50.4c1.3 0 2.5.5 3.3 1.4.9.9 1.4 2.1 1.4 3.3 0 1.2-.5 2.4-1.4 3.3-.8.9-2 1.4-3.3 1.4zm-16.6-3.7h-34.6c-.3 0-.5-.1-.7-.3-.2-.2-.3-.5-.3-.7 0-.3.1-.5.3-.7.2-.2.5-.3.7-.3h34.6c.1 0 .3 0 .4.1.1.1.2.1.3.2.1.1.2.2.2.3.1.1.1.3.1.4 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3zm-33.8 9.5h50.4c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7h-50.4c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7zm-.8 5.7h34.6c.3 0 .5-.1.7-.3.2-.2.3-.5.3-.7 0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.7-.3h-34.6c-.3 0-.5.1-.7.3-.2.2-.3.5-.3.7 0 .1 0 .3.1.4.1.1.1.2.2.3.1.1.2.2.3.2.1 0 .3.1.4.1zm51.2 18.9h-50.4c-1.2 0-2.4-.5-3.3-1.4-.9-.9-1.4-2.1-1.4-3.3 0-1.3.5-2.4 1.4-3.3.9-.9 2.1-1.4 3.3-1.4h50.4c1.3 0 2.5.5 3.3 1.4.9.9 1.4 2.1 1.4 3.3 0 1.3-.5 2.4-1.4 3.3-.8.9-2 1.4-3.3 1.4zm-16.6-3.7h-34.6c-.3 0-.5-.1-.7-.3-.2-.2-.3-.5-.3-.7 0-.3.1-.5.3-.7.2-.2.5-.3.7-.3h34.6c.1 0 .3 0 .4.1.1.1.2.1.3.2.1.1.2.2.2.3.1.1.1.3.1.4 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3z"
        clipRule="evenodd"
        opacity="0.24"
      />

      <path
        fill="#FFAB00"
        d="M248.8 161.845c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.6.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.5.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.5.4 1 1 1zm-4.6 15.1c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1 0 .6.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm0 15.1c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1 0 .6.4 1 1 1zm4.6 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.5.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.5.4 1 1 1z"
      />

      <path
        fill={PRIMARY_DARK}
        d="M253.3 161.845c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1 0 .6.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm-4.5 15.1c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.6.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.5.4 1 1 1zm4.5 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm0 15.1c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1 0 .6.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm-9.1-121.4c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1 0 .6.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm9.1 15.1c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1 0 .6.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm-4.5 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.5.4 1 1 1zm0 15.1c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1-.1.6.4 1 1 1zm-4.6 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1zm0 15.2c.6 0 1-.5 1-1 0-.6-.5-1-1-1-.6 0-1 .5-1 1s.4 1 1 1z"
      />

      <path
        fill={PRIMARY_DARKER}
        d="M170.6 243.645l-4.5 5.6c-.4.5-.9.9-1.5 1.2-.6.3-1.2.4-1.8.4h-40.2c-1.1 0-2.1.4-2.8 1.1-.8.7-1.3 1.7-1.4 2.7l-3.6 42.9c-.1.5 0 1 .2 1.5s.4.9.7 1.3c.3.4.7.7 1.2.9.5.2 1 .3 1.5.3h78.9c1.1 0 2.1-.4 2.8-1.1.8-.7 1.3-1.7 1.4-2.7l4.3-51.6c.1-.5 0-1-.2-1.5s-.4-.9-.7-1.3c-.3-.4-.7-.7-1.2-.9-.5-.2-1-.3-1.4-.3h-28.5c-.6 0-1.2.1-1.8.4-.5.2-1 .6-1.4 1.1z"
      />

      <path
        fill="url(#paint2_linear_1_99)"
        d="M154.6 246.645l-3.6 5.3c-.3.5-.8.9-1.3 1.1-.5.3-1.1.4-1.7.4h-33.1c-.5 0-1 .1-1.4.2-.4.2-.9.5-1.2.8-.3.3-.6.8-.8 1.2-.2.5-.2.9-.2 1.4l3 40.6c.1 1 .6 2 1.4 2.6.8.7 1.8 1 2.8 1h78.9c.5 0 1-.1 1.4-.2.4-.2.9-.5 1.2-.8.3-.3.6-.8.8-1.2.2-.5.2-.9.2-1.4l-3.6-48.9c-.1-1-.6-1.9-1.4-2.6-.8-.7-1.8-1-2.8-1h-35.5c-.6 0-1.2.1-1.7.4-.5.3-1 .7-1.4 1.1z"
      />

      <defs>
        <linearGradient
          id="paint0_linear_1_99"
          x1="179.716"
          x2="100.71"
          y1="61.393"
          y2="249.434"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_MAIN} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1_99"
          x1="209.454"
          x2="130.449"
          y1="73.888"
          y2="261.929"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_MAIN} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1_99"
          x1="168.021"
          x2="145.633"
          y1="238.622"
          y2="311.266"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={PRIMARY_MAIN} />
          <stop offset="1" stopColor={PRIMARY_DARK} />
        </linearGradient>
      </defs>
    </Box>
  );
}

export default memo(UpgradeStorageIllustration);
