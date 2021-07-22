import 'regenerator-runtime';

import { fromBuffer } from 'yauzl';
import { render } from 'react-dom';
import AbortController from 'abort-controller';
import React, { useEffect, useState } from 'react';

const Main = () => {
  const [error, setError] = useState();
  const [zipFile, setZipFile] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    (async function () {
      const res = await fetch('/bundles.zip');

      if (!res.ok) {
        abortController.signal.aborted || setError('failed to fetch zip');

        return;
      }

      const body = await res.arrayBuffer();

      console.log(body.byteLength);

      fromBuffer(Buffer.from(body), { lazyEntries: true }, (err, zipFile) => {
        console.log({ err, zipFile });

        zipFile.readEntry();
        zipFile.on('entry', entry => {
          console.log(entry.fileName);
          zipFile.readEntry();

          if (entry.fileName === 'webchat-es5.js') {
            zipFile.openReadStream(entry, (err, readStream) => {
              const chunks = [];

              readStream.on('end', () => {
                const scriptElement = document.createElement('script');

                scriptElement.setAttribute('async', 'async');
                scriptElement.setAttribute(
                  'src',
                  URL.createObjectURL(new Blob([Buffer.concat(chunks)], { type: 'text/javascript' }))
                );

                document.head.appendChild(scriptElement);
              });

              readStream.on('data', chunk => chunks.push(chunk));
            });
          }
        });
      });
    })();

    return () => abortController.abort();
  }, []);

  return <h1>Hello, World!</h1>;
};

render(<Main />, document.getElementById('root'));
