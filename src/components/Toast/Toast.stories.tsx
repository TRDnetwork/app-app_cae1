import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { useState } from 'react';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
    autoDismiss: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  render: (args) => {
    const [show, setShow] = useState(true);
    return <Toast {...args} show={show} onClose={() => setShow(false)} />;
  },
  args: {
    type: 'success',
    message: 'Form submitted successfully!',
  },
};

export const Error: Story = {
  render: (args) => {
    const [show, setShow] = useState(true);
    return <Toast {...args} show={show} onClose={() => setShow(false)} />;
  },
  args: {
    type: 'error',
    message: 'Failed to send message. Please try again.',
  },
};

export const Warning: Story = {
  render: (args) => {
    const [show, setShow] = useState(true);
    return <Toast {...args} show={show} onClose={() => setShow(false)} />;
  },
  args: {
    type: 'warning',
    message: 'Please review the form fields.',
  },
};

export const Info: Story = {
  render: (args) => {
    const [show, setShow] = useState(true);
    return <Toast {...args} show={show} onClose={() => setShow(false)} />;
  },
  args: {
    type: 'info',
    message: 'Your session will expire soon.',
  },
};