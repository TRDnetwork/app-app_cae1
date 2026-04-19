import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'textarea'],
    },
    error: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Text: Story = {
  args: {
    label: 'Name',
    type: 'text',
    id: 'name',
    placeholder: 'Enter your name',
  },
};

export const Email: Story = {
  args: {
    label: 'Email',
    type: 'email',
    id: 'email',
    placeholder: 'you@example.com',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    id: 'password',
    placeholder: '••••••••',
  },
};

export const Textarea: Story = {
  args: {
    label: 'Message',
    type: 'textarea',
    id: 'message',
    placeholder: 'Write your message...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    id: 'email-error',
    error: 'Please enter a valid email address.',
    value: 'invalid-email',
  },
};

export const Required: Story = {
  args: {
    label: 'Name',
    type: 'text',
    id: 'name-required',
    required: true,
  },
};