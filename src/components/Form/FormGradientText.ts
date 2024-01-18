import { styled } from '@mui/system';
import { Typography } from '@mui/material/styles/createTypography';
import { Theme } from '@mui/material';

export const GradientOutline = styled('span')({
  position: 'relative',
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  background: 'transparent',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
    border: '3px solid transparent',
    background: 'linear-gradient(90deg, #259DFE -0.86%, #8C49FB 102.01%) border-box',
    WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'destination-out',
    maskComposite: 'exclude',
  },
});

export const GradientInput = styled('input')((props) => ({
  position: 'relative',
  margin: '2px 10px',
  border: 'none',
  outline: 'none',
  height: props.height ?? 40,
  width: '100%',
  background: 'transparent',
  color: props.theme.palette.primary.contrastText,
  fontSize: (props.theme.typography as Typography).htmlFontSize
}));

export const GradientInput_V2 = styled('div')((props) => ({
  border: 'double 5px transparent',
  height: 40,
  width: 100,
  borderRadius: 10,
  background: 'transparent',
  color: props.theme.palette.primary.contrastText,
  fontSize: (props.theme.typography as Typography).htmlFontSize
}));

export const GradientTextArea = styled('textarea', {
  shouldForwardProp: (prop) => prop !== "height"
})(({ theme, height }: {theme: Theme, height: number}) => ({
  position: 'relative',
  margin: '2px 10px',
  border: 'none',
  outline: 'none',
  height: height,
  width: '100%',
  background: 'transparent',
  color: theme.palette.primary.contrastText,
  fontSize: (theme.typography as Typography).htmlFontSize
})) as any;

// export default FormGradientText;