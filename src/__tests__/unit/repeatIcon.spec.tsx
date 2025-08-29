import Repeat from '@mui/icons-material/Repeat';
import { Box, Stack, Typography } from '@mui/material';
import { render, screen } from '@testing-library/react';

import { Event } from '../../types';

// 반복 일정 아이콘을 표시하는 컴포넌트
const EventItem = ({ event }: { event: Event }) => {
  const isRepeating = event.repeat.type !== 'none';

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        {isRepeating && <Repeat data-testid="repeat-icon" fontSize="small" />}
        <Typography>{event.title}</Typography>
      </Stack>
    </Box>
  );
};

describe('반복 일정 아이콘 표시', () => {
  const baseEvent: Event = {
    id: '1',
    title: '테스트 이벤트',
    date: '2025-08-30',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    location: '',
    category: '업무',
    notificationTime: 10,
    repeat: {
      type: 'none',
      interval: 1,
    },
  };

  it('반복 일정이 아닌 경우 아이콘이 표시되지 않는다', () => {
    const nonRepeatingEvent = {
      ...baseEvent,
      repeat: { type: 'none' as const, interval: 1 },
    };

    render(<EventItem event={nonRepeatingEvent} />);

    expect(screen.queryByTestId('repeat-icon')).not.toBeInTheDocument();
    expect(screen.getByText('테스트 이벤트')).toBeInTheDocument();
  });

  it('매일 반복 일정인 경우 아이콘이 표시된다', () => {
    const dailyRepeatingEvent = {
      ...baseEvent,
      repeat: { type: 'daily' as const, interval: 1 },
    };

    render(<EventItem event={dailyRepeatingEvent} />);

    expect(screen.getByTestId('repeat-icon')).toBeInTheDocument();
    expect(screen.getByText('테스트 이벤트')).toBeInTheDocument();
  });

  it('매주 반복 일정인 경우 아이콘이 표시된다', () => {
    const weeklyRepeatingEvent = {
      ...baseEvent,
      repeat: { type: 'weekly' as const, interval: 1 },
    };

    render(<EventItem event={weeklyRepeatingEvent} />);

    expect(screen.getByTestId('repeat-icon')).toBeInTheDocument();
    expect(screen.getByText('테스트 이벤트')).toBeInTheDocument();
  });

  it('매월 반복 일정인 경우 아이콘이 표시된다', () => {
    const monthlyRepeatingEvent = {
      ...baseEvent,
      repeat: { type: 'monthly' as const, interval: 1 },
    };

    render(<EventItem event={monthlyRepeatingEvent} />);

    expect(screen.getByTestId('repeat-icon')).toBeInTheDocument();
    expect(screen.getByText('테스트 이벤트')).toBeInTheDocument();
  });

  it('매년 반복 일정인 경우 아이콘이 표시된다', () => {
    const yearlyRepeatingEvent = {
      ...baseEvent,
      repeat: { type: 'yearly' as const, interval: 1 },
    };

    render(<EventItem event={yearlyRepeatingEvent} />);

    expect(screen.getByTestId('repeat-icon')).toBeInTheDocument();
    expect(screen.getByText('테스트 이벤트')).toBeInTheDocument();
  });
});
