import { render } from '@testing-library/react';

import MetabuildComponents from './metabuild-components';

describe('MetabuildComponents', () => {
  
  it('should render successfully', () => {
    const { baseElement } = render(<MetabuildComponents />);
    expect(baseElement).toBeTruthy();
  });
  
});
