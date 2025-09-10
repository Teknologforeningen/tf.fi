import * as migration_20250910_003018 from './20250910_003018';

export const migrations = [
  {
    up: migration_20250910_003018.up,
    down: migration_20250910_003018.down,
    name: '20250910_003018'
  },
];
