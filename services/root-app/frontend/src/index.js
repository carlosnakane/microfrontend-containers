import "./polyfills";
import moduleLoader from './module-loader';

utils = {
  moduleLoader: moduleLoader
}

utils.moduleLoader
  .init()
    .them()
    .catch();