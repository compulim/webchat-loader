import loadScript from './loadScript';
import loadStylesheet from './loadStylesheet';

export default async function loadAsset(src) {
  const [assetURL, integrity] = Array.isArray(src) ? src : [src, undefined];

  return /\.css$/i.test(assetURL) ? loadStylesheet(assetURL, integrity) : await loadScript(assetURL, integrity);
}
