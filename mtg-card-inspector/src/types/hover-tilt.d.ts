declare namespace JSX {
  interface IntrinsicElements {
    'hover-tilt': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      'tilt-factor'?: string;
      'scale-factor'?: string;
    };
  }
}