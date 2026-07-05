'use client';

import { useState } from 'react';
import {
  TextInput,
  Textarea,
  SearchInput,
  Select,
  Checkbox,
  RadioGroup,
  Toggle,
  Slider,
  Paper,
} from 'sketchpad-ui';

export default function FormsPage() {
  const [checked, setChecked] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [slider, setSlider] = useState(50);
  const [radio, setRadio] = useState('a');
  const [select, setSelect] = useState('');

  return (
    <div>
      <h1>Forms</h1>
      <Paper className="demoBox" seed="forms-demo">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
          <TextInput label="Name" placeholder="Your name" seed="name" />
          <Textarea label="Notes" placeholder="Write something…" seed="notes" />
          <SearchInput seed="search" />
          <Select
            label="Framework"
            placeholder="Pick one"
            value={select}
            onChange={setSelect}
            options={[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'svelte', label: 'Svelte' },
            ]}
          />
          <Checkbox label="Accept terms" checked={checked} onChange={setChecked} />
          <RadioGroup
            name="demo"
            value={radio}
            onChange={setRadio}
            options={[
              { value: 'a', label: 'Option A' },
              { value: 'b', label: 'Option B' },
            ]}
          />
          <Toggle label="Notifications" checked={toggle} onChange={setToggle} />
          <Slider label="Volume" value={slider} onChange={setSlider} />
          <TextInput label="Email" error="Invalid email address" seed="error-input" />
        </div>
      </Paper>
    </div>
  );
}
