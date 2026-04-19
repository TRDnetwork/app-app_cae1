import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h3 className="text-xl font-semibold text-[#1a2e1a] mb-2">Project Title</h3>
        <p className="text-[#4a4a4a]">This is a sample project card with a description.</p>
      </>
    ),
  },
};