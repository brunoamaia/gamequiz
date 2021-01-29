import React from 'react';

import Widget from '../../Widget';

// eslint-disable-next-line react/prop-types
function LoadingWidget({ name }) {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>

      <Widget.Content>
        {`${name} aguarde o jogo está carregando...`}
      </Widget.Content>
    </Widget>
  );
}

export default LoadingWidget;
