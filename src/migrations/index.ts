import * as migration_20250910_003018 from './20250910_003018';
import * as migration_20261115_194541 from './20261115_194541';

export const migrations = [
  {
    up: migration_20250910_003018.up,
    down: migration_20250910_003018.down,
    name: '20250910_003018',
  },
  {
    up: migration_20261115_194541.up,
    down: migration_20261115_194541.down,
    name: '20261115_194541'
  },
];
