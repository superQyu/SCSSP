import { lazy, useState, Suspense } from 'react';

import { Box, Tabs, Tab, Alert, CircularProgress, Stack, styled } from '@mui/material';

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.text.primary,
}));

const compList = import.meta.glob('./components/**/*.tsx');

const menuList = Object.entries(compList).map(([key, val]) => {
  let label = key.split('/').slice(-1)[0].split('.')[0];
  if (label === 'index') {
    label = key.split('/').slice(-2)[0];
  }
  return {
    label: label,
    Component: lazy(val as () => Promise<any>),
  };
});

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ComponentDoc() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const CompNme = () => {
    const label = menuList[value].label;
    return `<${label} />`;
  };

  const DynamicComp = () => {
    const Comp = menuList[value].Component;
    return <Comp />;
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: '100%',
          width: '100%',
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {menuList.map((item, idx) => (
            <StyledTab label={item.label} {...a11yProps(idx)} key={idx} />
          ))}
        </Tabs>
        <Box sx={{ width: '100%', height: '100%', padding: '0 2rem' }}>
          <Suspense fallback={<CircularProgress size={20} />}>
            <Stack sx={{ width: '100%', mb: '25px' }} spacing={2}>
              <Alert severity="success">
                <CompNme />
              </Alert>
            </Stack>
            <DynamicComp />
          </Suspense>
        </Box>
      </Box>
    </Box>
  );
}
