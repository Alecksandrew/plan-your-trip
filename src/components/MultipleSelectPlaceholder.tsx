import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 152, // w-38 = 152px (mesmo tamanho do botão)
      backgroundColor: '#f2f2f2', // bg-paleta-03
      border: '2px solid #f26716', // border-paleta-01
      borderRadius: '2px', // rounded-sm (igual ao List)
      marginTop: '4px', // pequeno espaço entre o botão e o dropdown
      padding: '0px', // remove padding padrão
    },
  },
  variant: 'menu' as const,
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'left' as const,
  },
  transformOrigin: {
    vertical: 'top' as const,
    horizontal: 'left' as const,
  },
};

const names = [
  'Natureza',
  'Gastronomia',
  'História',
  'Cultura',
  'Aventura',
  'Praia',
  'Montanha',
  'Vida Noturna',
  'Arte',
  'Religioso',
  'Eventos/Festivais',
  'Fotografia',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
    backgroundColor: personName.includes(name) ? '#f26716' : 'transparent', // bg-paleta-01 when selected
    color: personName.includes(name) ? '#f2f2f2' : '#111827', // text-paleta-03 when selected, text-paleta-04 default
    fontSize: '14px', // text-sm
    textAlign: 'center' as const,
    padding: '2px 4px', // padding bem pequeno, igual ao List
    minHeight: 'auto', // remove altura mínima padrão
  };
}

export default function MultipleSelectPlaceholder() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <FormControl
        sx={{
          width: 152, // w-38
          margin: 0,
          position: 'relative',
          '& .MuiOutlinedInput-root': {
            padding: '1px 2px', // padding bem pequeno, igual ao List p-0.5
            border: '2px solid #f26716', // border-2 border-paleta-01
            borderRadius: '4px', // rounded-sm (igual ao List)
            backgroundColor: '#f2f2f2', // bg-paleta-03
            fontSize: '14px', // text-sm
            fontWeight: 600, // font-semibold
            minHeight: '28px', // altura compacta
            '&:hover': {
              border: '2px solid #f26716',
            },
            '&.Mui-focused': {
              border: '2px solid #f26716',
              borderRadius: '0px', // active:rounded-none (igual ao List)
            },
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none', // Remove a borda padrão do Material UI
            },
            '& .MuiSelect-select': {
              padding: '2px 8px', // padding lateral maior para dar espaço à setinha
            },
          },
        }}

      >
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em style={{ color: '#111827', fontStyle: 'normal' }}>Selecione opções</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={{
            ...MenuProps,
            PaperProps: {
              ...MenuProps.PaperProps,
              sx: {
                ...MenuProps.PaperProps.style,
                left: '0px !important',
                right: 'auto !important',
                transform: 'none !important',
                position: 'absolute',
                borderRadius: '2px', // rounded-sm (igual ao List)
                '& .MuiMenuItem-root': {
                  padding: '2px 4px', // padding bem pequeno, igual ao List
                  minHeight: 'auto',
                },
              }
            }
          }}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="" style={{ display: 'none' }}>
            <em>Selecione opções</em>
          </MenuItem>
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
